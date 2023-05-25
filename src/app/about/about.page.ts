import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  form: UntypedFormGroup;
  telephone = "+918903458759";
  age = 32;

  @ViewChild('telephoneInput', {static: true}) ionTelephone: IonInput;
  @ViewChild('ageInput', {static: true}) ionAge: IonInput;

  constructor(private builder: UntypedFormBuilder) {
    /*
    this.form = this.formBuilder.group({
      firstName: [
        this.authService.firstName,
        Validators.compose([Validators.required, Validators.maxLength(64)])
      ],
      lastName: [
        this.authService.lastName,
        Validators.compose([Validators.required, Validators.maxLength(64)])
      ],
    });

    */
    this.form = this.builder.group({
      telephone: [
        this.telephone,
        Validators.compose([Validators.required, Validators.maxLength(16)])
      ],
      age: [
        this.age,
        Validators.required
      ]
    });
  }

  ngOnInit() {

  }
}
