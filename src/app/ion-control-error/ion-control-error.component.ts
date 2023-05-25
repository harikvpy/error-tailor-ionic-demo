import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { DefaultControlErrorComponent } from '@ngneat/error-tailor';

/**
 * All our form controls are laid out within an ion-item which in turn
 * are within a parent ion-list. This custom error control displays
 * the error, using the new ion-note[slot='error'] Ionic component.
 */
@Component({
  selector: 'custom-control-error',
  template: `
    <ion-note slot="error" color='danger'>{{ errorText }}</ion-note>
    <ng-template *ngTemplateOutlet="errorTemplate; context: errorContext"></ng-template>
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
  const notes = errorElement.getElementsByTagName('ion-note');
  if (notes.length > 0) {
    const noteElem = notes[0];
    errorElement.removeChild(noteElem);
    // console.log('anchorIonErrorComponent - parentElement:', hostElement.parentElement)
    hostElement.parentElement.appendChild(noteElem);
  }
  return () => {
    const ionNoteNode = hostElement.parentElement.querySelector('ion-note[slot="error"]');
    if (ionNoteNode) {
      ionNoteNode.remove();
    }
    const customErrorControlNode = hostElement.parentElement.querySelector('custom-control-error');
    if (customErrorControlNode) {
      customErrorControlNode.remove();
    }
  };
}
