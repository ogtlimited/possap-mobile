import { TranslateModule } from '@ngx-translate/core';
import { SlideToConfirmComponent } from './slide-to-confirm/slide-to-confirm.component';
import { PasscodeComponent } from './passcode/passcode.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { HeaderComponent } from "./header/header.component";
import { FormComponent } from './dynamic-form/form/form.component';
import { SelectModalComponent } from './select-modal/select-modal.component';


@NgModule({
  declarations: [HeaderComponent, PasscodeComponent, SlideToConfirmComponent, FormComponent,SelectModalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, TranslateModule],
  exports: [HeaderComponent, PasscodeComponent, SlideToConfirmComponent, FormComponent,SelectModalComponent],
})
export class SharedModule {}
