import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { IonControlErrorComponentModule } from './ion-control-error/ion-control-error.module';
import { IonControlErrorComponent, anchorIonErrorComponent } from './ion-control-error/ion-control-error.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonControlErrorComponentModule,
        ErrorTailorModule.forRoot({
            errors: {
                useFactory() {
                    return {
                        required: 'This field is required',
                        email: 'Invalid email address',
                        minlength: ({ requiredLength, actualLength }) => `Expect ${requiredLength} but got ${actualLength}`,
                    };
                },
                deps: []
            },
            blurPredicate: (element: Element) => {
                return element.tagName === 'ION-INPUT' || element.tagName === 'ION-SELECT';
            },
            controlErrorComponent: IonControlErrorComponent,
            controlErrorComponentAnchorFn: anchorIonErrorComponent
        })
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
