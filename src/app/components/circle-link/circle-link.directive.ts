import { Directive } from '@angular/core';

@Directive({
  selector: 'a[circle-link]',
  exportAs: 'circleLink',
  host: {
    '[class.circle-link]': 'true'
  }
})
export class CircleLinkDirective {

  constructor() { }

}
