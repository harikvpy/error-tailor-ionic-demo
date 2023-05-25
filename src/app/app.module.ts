import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonControlErrorComponentModule } from './ion-control-error/ion-control-error.module';
import {
  IonControlErrorComponent,
  anchorIonErrorComponent,
} from './ion-control-error/ion-control-error.component';
import { HttpClientModule } from '@angular/common/http';
import { provideErrorTailorConfig, errorTailorImports } from '@ngneat/error-tailor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonControlErrorComponentModule,
    errorTailorImports,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideErrorTailorConfig({
      errors: {
        useValue: {
            required: 'This field is required',
            minlength: ({ requiredLength, actualLength }) => `Expect ${requiredLength} but got ${actualLength}`,
            email: 'Invalid email address',
            invalid: 'Invalid input',
            passwordsMismatch: "Two passwords don't match"
        },
      },
      blurPredicate: (element: Element) => {
        return (
          element.tagName === 'ION-INPUT' || element.tagName === 'ION-SELECT'
        );
      },
      controlErrorComponent: IonControlErrorComponent,
      controlErrorComponentAnchorFn: anchorIonErrorComponent,
      controlErrorsOn: {
        async: true,
        blur: true,
        change: false,
        status: true
      }
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
