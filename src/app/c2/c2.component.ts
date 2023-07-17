import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-c2',
  templateUrl: './c2.component.html',
  standalone: true,
})
export class C2Component {
  message = 'Hello, World!';
}
