import { SharedModule } from './../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AccountPage } from './account';
import { AccountPageRoutingModule } from './account-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    AccountPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    AccountPage,
  ]
})
export class AccountModule { }
