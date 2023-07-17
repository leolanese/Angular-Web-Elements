import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { ImageComponent } from '../image-component/image.component';
import { LabelHighlightDirective } from '../highlight/highlight.directive';
import { NgIf } from '@angular/common';

@Component({
  selector: 'display',
  standalone: true,
  imports: [
    DynamicFormComponent,
    ImageComponent,
    LabelHighlightDirective,
    NgIf
  ],
  templateUrl: './display.component.html',
})
export class DisplayComponent {
    title = 'Angular standalone component implementation';
    name = 'TheWorkshopLabs';
    url = 'https://avatars.githubusercontent.com/u/19494451?s=200&v=4';

}