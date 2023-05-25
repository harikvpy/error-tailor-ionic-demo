import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';


// A simple validator function to compare values of fields
// newPassword1 and newPassword2. If the values are not equal, the error attribute
// 'matchError' will be set to true in form.controls.newPassword1.
export function matchPasswords(ac: AbstractControl) {
  const newPassword1 = ac.get('newPassword1').value;
  const newPassword2 = ac.get('newPassword2').value;
  if (newPassword1 !== newPassword2) {
    console.log('passwords dont match')
    ac.get('newPassword2').setErrors({ passwordsMismatch: true });
  } else {
    console.log('passwords match')
    return null;
  }
}

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
          <ion-item>
            <ion-label position="stacked">Password</ion-label>
            <ion-input formControlName="newPassword1" ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Confirm Password</ion-label>
            <ion-input formControlName="newPassword2" ></ion-input>
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

  form: UntypedFormGroup;

  constructor(private builder: FormBuilder, private http: HttpClient) {
    this.form = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      newPassword1: ["", Validators.required],
      newPassword2: ["", Validators.required],
    },
    {
      validator: matchPasswords,
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
