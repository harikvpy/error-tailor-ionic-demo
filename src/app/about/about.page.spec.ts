import { async, ComponentFixture, fakeAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { AboutPage } from "./about.page";
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { IonControlErrorComponent, anchorIonErrorComponent } from '../ion-control-error/ion-control-error.component';
import { IonControlErrorComponentModule } from '../ion-control-error/ion-control-error.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { typeInIonicInputAndFocusOut, getControlErrorIonItemText } from 'src/testing/utils.spec';

describe("AboutPage", () => {
  let spectator: Spectator<AboutPage>;
  let fixture: ComponentFixture<AboutPage>;
  const createPage = createComponentFactory({
    component: AboutPage,
    declarations: [AboutPage],
    imports: [
      RouterTestingModule,
      FormsModule,
      ReactiveFormsModule,
      IonControlErrorComponentModule,
      ErrorTailorModule.forRoot({
        errors: {
          useFactory() {
            return {
              required: "This field is required",
              email: "Invalid email address",
              minlength: ({ requiredLength, actualLength }) =>
                `Expect ${requiredLength} but got ${actualLength}`,
            };
          },
          deps: [],
        },
        blurPredicate: (element: Element) => {
          return (
            element.tagName === "ION-INPUT" ||
            element.tagName === "ION-SELECT"
          );
        },
        controlErrorComponent: IonControlErrorComponent,
        controlErrorComponentAnchorFn: anchorIonErrorComponent,
      }),
      IonicModule.forRoot({
        mode: "md"
      }),
    ],
  });

  beforeEach(async(() => {
    spectator = createPage();
    fixture = spectator.fixture;
  }));

  it("should create", () => {
    expect(spectator).toBeTruthy();
  });

  it('should set required error', fakeAsync(() => {
    const telephone = spectator.query<HTMLElement>('ion-input')
    typeInIonicInputAndFocusOut(telephone, '');
    spectator.tick();
    expect(getControlErrorIonItemText(telephone)).toEqual('This field is required');
  }));
});
