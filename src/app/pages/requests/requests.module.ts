import { PreviewTableComponent } from './preview-table/preview-table.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { AbbrevPipe } from './../../core/pipes/abbrev.pipe';
import { SharedModule } from './../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { RequestsPageRoutingModule } from './requests-routing.module';

import { RequestsPage } from './requests.page';
import { FilterPipe } from './../../core/pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RequestsPageRoutingModule,
    SharedModule,
    TranslateModule,
  ],
  declarations: [
    RequestsPage,
    AbbrevPipe,
    RequestDetailsComponent,
    PreviewTableComponent,
    FilterPipe,
  ],
})
export class RequestsPageModule {}
