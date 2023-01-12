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

@NgModule({
  declarations: [
    HeaderComponent,
    PasscodeComponent,
    SlideToConfirmComponent,
    FormComponent,
    NextApprovalLevelPipe,
    SelectModalComponent,
    ApproveSuccessComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
  ],
  exports: [
    HeaderComponent,
    PasscodeComponent,
    SlideToConfirmComponent,
    FormComponent,
    NextApprovalLevelPipe,
    SelectModalComponent,
    ApproveSuccessComponent,
  ],
})
export class SharedModule {}
