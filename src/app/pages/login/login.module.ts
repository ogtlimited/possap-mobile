import { SharedModule } from './../../components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LoginPage } from './login';
import { LoginPageRoutingModule } from './login-routing.module';
import { OfficerFormComponent } from './officer-form/officer-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    TranslateModule,

  ],
  declarations: [
    LoginPage,
    OfficerFormComponent,
  ]
})
export class LoginModule { }
