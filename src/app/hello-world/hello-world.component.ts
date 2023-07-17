import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hello-world',
  template: `
      <h2 i18n>Hello {{ state?.value1 }}</h2>
      <h2 i18n>World {{ state?.value2 }}</h2>
      <p>'state$' Observable acts as a conduit for passing state data from Parent to Child component</p>
  `,
  imports: [
    CommonModule,
  ],
  styles: [],
  standalone: true,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelloWorldComponent {
  @Input() state?: { value1: string; value2: string };

  constructor() {}

}
