import { SharedModule } from './../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MorePageRoutingModule } from './more-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MorePage } from './more.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MorePageRoutingModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [MorePage]
})
export class MorePageModule {}
