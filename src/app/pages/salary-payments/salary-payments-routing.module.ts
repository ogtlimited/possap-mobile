import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalaryPaymentsPage } from './salary-payments.page';

const routes: Routes = [
  {
    path: '',
    component: SalaryPaymentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalaryPaymentsPageRoutingModule {}
