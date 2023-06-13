import { TranslateModule } from '@ngx-translate/core';
import { SlideToConfirmComponent } from './slide-to-confirm/slide-to-confirm.component';
import { PasscodeComponent } from './passcode/passcode.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './dynamic-form/form/form.component';
import { NextApprovalLevelPipe } from '../core/pipes/next-approval-level.pipe';
import { SelectModalComponent } from './select-modal/select-modal.component';
import { ApproveSuccessComponent } from '../pages/requests/request-details/approve-success/approve-success.component';
import { PccApproversComponent } from './pcc-approvers/pcc-approvers.component';
import { AbbrevPipe } from '../core/pipes/abbrev.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    PasscodeComponent,
    SlideToConfirmComponent,
    FormComponent,
    NextApprovalLevelPipe,
    SelectModalComponent,
    ApproveSuccessComponent,
    PccApproversComponent,
    AbbrevPipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    // FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    PasscodeComponent,
    SlideToConfirmComponent,
    FormComponent,
    NextApprovalLevelPipe,
    SelectModalComponent,
    ApproveSuccessComponent,
    PccApproversComponent,
    AbbrevPipe
  ],
})
export class SharedModule {}
