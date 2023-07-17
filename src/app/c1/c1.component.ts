import { NgFor, NgSwitch } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-c1',
  templateUrl: './c1.component.html',
  standalone: true,
  imports: [
    NgFor
  ]
})
export class C1Component {
  items = Array(10).fill(0); 

  day: number = 1;
}
