import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  template: `
  <ion-header [translucent]="true">
    <ion-toolbar>
      <ion-title>
        Blank
      </ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content [fullscreen]="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title size="large">Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <div id="container">

      <form [formGroup]='form' (ngSubmit)="onSubmit()" errorTailor>
        <ion-list>
          <ion-item>
            <ion-label position="stacked">Name</ion-label>
            <ion-input formControlName="name" ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input formControlName="email" ></ion-input>
          </ion-item>
        </ion-list>

        <div class="ion-padding">
          <ion-button expand="block" type="submit" class="ion-no-margin" [disabled]="!form.valid">Submit</ion-button>
        </div>
      </form>

    </div>
  </ion-content>
  `
})
export class HomePage {

  form: FormGroup;

  constructor(private builder: FormBuilder, private http: HttpClient) {
    this.form = this.builder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    const raiseErrors = Math.floor(Math.random()*1000) % 3 == 0
    if (raiseErrors) {
      console.log("Setting 'invalid' error on email");
      this.form.controls['email'].setErrors({invalid: true})
    } else {
      console.log("Clearing errors on email.");
      this.form.controls['email'].setErrors(null);
    }
  }

}
