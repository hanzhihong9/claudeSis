import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserProfile {
  name: string;
  count: number;
}

@Component({
  selector: 'app-broken-child',
  standalone: true,
  template: `
    <section class="card bad">
      <h3>Broken: same object reference</h3>
      <p>Name: {{ profile.name }}</p>
      <p>Count: {{ profile.count }}</p>
      <small>OnPush + in-place mutation => no update</small>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrokenChildComponent {
  @Input() profile!: UserProfile;
}

@Component({
  selector: 'app-fixed-ref-child',
  standalone: true,
  template: `
    <section class="card good">
      <h3>Fixed: new object reference</h3>
      <p>Name: {{ profile.name }}</p>
      <p>Count: {{ profile.count }}</p>
      <small>Reassigning the root object triggers CD.</small>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixedRefChildComponent {
  @Input() profile!: UserProfile;
}

@Component({
  selector: 'app-mark-for-check-child',
  standalone: true,
  template: `
    <section class="card warn">
      <h3>Fixed: markForCheck()</h3>
      <p>Name: {{ profile.name }}</p>
      <p>Count: {{ profile.count }}</p>
      <button type="button" (click)="refresh()">Trigger markForCheck()</button>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkForCheckChildComponent {
  @Input() profile!: UserProfile;

  constructor(private readonly cdr: ChangeDetectorRef) { }

  refresh(): void {
    this.cdr.markForCheck();
  }
}

@Component({
  selector: 'app-async-child',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <section class="card async">
      <h3>Fixed: async pipe + observable</h3>
      <p>Name: {{ (profile$ | async)?.name }}</p>
      <p>Count: {{ (profile$ | async)?.count }}</p>
      <small>Observable emits a new value, which triggers CD.</small>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncChildComponent {
  profile$ = new BehaviorSubject<UserProfile>({ name: 'Dana', count: 0 });
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BrokenChildComponent, FixedRefChildComponent, MarkForCheckChildComponent, AsyncChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  profile: UserProfile = { name: 'Alice', count: 0 };
  lastAction = 'Initial state';

  mutateNestedProperty(): void {
    this.profile.count += 1;
    this.lastAction = 'Mutated nested property in place: same object reference';
  }

  replaceReference(): void {
    this.profile = { ...this.profile, count: this.profile.count + 1 };
    this.lastAction = 'Recreated the profile object: new reference';
  }

  reset(): void {
    this.profile = { name: 'Alice', count: 0 };
    this.lastAction = 'Reset the profile';
  }
}
