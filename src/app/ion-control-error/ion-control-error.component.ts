import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, TemplateRef } from '@angular/core';
import { ControlErrorComponent } from '@ngneat/error-tailor';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'custom-control-error',
  template: `
    <ion-item lines="none" class="ion-text-wrap" [class.hide-control]="hide" *ngIf="!_tpl">
      <ion-label color='danger' class="ion-no-margin ion-text-wrap" stacked>
        {{ _text }}
      </ion-label>
    </ion-item>
    <ng-template *ngTemplateOutlet="_tpl; context: context"></ng-template>
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
export class IonControlErrorComponent implements ControlErrorComponent {
  _text: string | null = null;
  _tpl: TemplateRef<{ $implicit: ValidationErrors; text: string }> | undefined;
  context: { $implicit: ValidationErrors; text: string };
  hide = true;

  createTemplate(
    tpl: TemplateRef<{ $implicit: ValidationErrors; text: string }>,
    error: ValidationErrors,
    text: string
  ) {
    this._tpl = tpl;
    this.context = { $implicit: error, text };
    this.cdr.markForCheck();
  }

  set customClass(className: string) {
    this.host.nativeElement.classList.add(className);
  }

  set text(value: string | null) {
    if (value !== this._text) {
      this._text = value;
      this.hide = !value;
      this.cdr.markForCheck();
    }
  }

  constructor(private cdr: ChangeDetectorRef, private host: ElementRef<HTMLElement>) {}
}

// error component anchor/destroy functions

/**
 * Hook to attach error messages to the control's grandparent rather than its parent.
 * Uses direct manipulation of DOM.
 */
export function anchorIonErrorComponent(hostElement: Element, errorElement: Element) {
  hostElement.parentElement.parentElement.append(errorElement);
  return destroyIonErrorComponent;
}

/**
 * Hook to destroy the control's error component HTML fragment added by ionErrorComponentAnchorFn.
 */
function destroyIonErrorComponent(hostElement: Element, errorElement: Element) {
}
