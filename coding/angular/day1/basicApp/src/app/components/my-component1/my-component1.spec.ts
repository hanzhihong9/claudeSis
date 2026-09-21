import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyComponent1 } from './my-component1';

describe('MyComponent1', () => {
  let component: MyComponent1;
  let fixture: ComponentFixture<MyComponent1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent1],
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
