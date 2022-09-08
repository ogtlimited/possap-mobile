import { TranslateModule } from '@ngx-translate/core';
import { OfficerFormComponent } from './officer-form/officer-form.component';
import { SharedModule } from './../../components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignupPage } from './signup';
import { SignupPageRoutingModule } from './signup-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    SignupPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    SignupPage,
    OfficerFormComponent
  ]
})
export class SignUpModule { }
