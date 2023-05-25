import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonControlErrorComponent } from './ion-control-error.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [IonControlErrorComponent],
  imports: [CommonModule, IonicModule],
  exports: [IonControlErrorComponent]
})
export class IonControlErrorComponentModule {}
