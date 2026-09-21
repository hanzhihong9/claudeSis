import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyComponent1 } from './components/my-component1/my-component1';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MyComponent1],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('basicApp');
}
