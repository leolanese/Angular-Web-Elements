import { Directive } from '@angular/core';

@Directive({
  selector: '[app-label-highlight]',
  standalone: true,
  host: {
    '[style.background-color]': "'#BADA55'",
    '[style.padding]': "'0.1em 0.2em'",
    '[style.margin-top]': "'0.1em'",
    '[style.width]': "'100%'",
  },
})
export class LabelHighlightDirective {}