import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-component1',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-component1.html',
  styleUrl: './my-component1.scss',
})
export class MyComponent1 {
  // properties can be interpulated 
  public myProperty: string = 'Hello, World!';
  // private readonly object property cannot be interpulated directly in the template
  private readonly objectProperty = { key: 'value', count: 90 };

  public onClick(): void {
    this.myProperty = 'New Value from click function';
  }

  public imgURL: string = 'https://avatars.githubusercontent.com/u/4586894?v=4&size=40';

  public aInputValue: string = '';
}
