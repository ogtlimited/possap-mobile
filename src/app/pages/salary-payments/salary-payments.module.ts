import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../components/shared.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalaryPaymentsPageRoutingModule } from './salary-payments-routing.module';

import { SalaryPaymentsPage } from './salary-payments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalaryPaymentsPageRoutingModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [SalaryPaymentsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalaryPaymentsPageModule {}
