import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { DefaultControlErrorComponent } from '@ngneat/error-tailor';

@Component({
  selector: 'custom-control-error',
  template: `
    <ion-item lines="none" class="ion-text-wrap" [class.hide-control]="hideError">
      <ion-label color="danger" class="ion-no-margin ion-text-wrap" stacked>
        {{ errorText }}
      </ion-label>
    </ion-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .hide-control {
        display: none !important;
      }

      :host {
        display: block;
      }
    `
  ]
})
export class IonControlErrorComponent extends DefaultControlErrorComponent {
  constructor(cdr: ChangeDetectorRef, host: ElementRef<HTMLElement>) {
    super(cdr, host);
  }
}

/**
 * Hook to attach error messages to the control's grandparent rather than its parent.
 * Uses direct manipulation of DOM.
 */
export function anchorIonErrorComponent(hostElement: Element, errorElement: Element) {
  hostElement.parentElement.insertAdjacentElement('afterend', errorElement);
  return () => {
    let errorNode = hostElement.parentElement.querySelector('custom-control-error');
    if (errorNode) {
      errorNode.remove();
    }
  };
}
