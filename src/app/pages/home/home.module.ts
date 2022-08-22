import { MyMapComponent } from './components/my-map/my-map.component';
import { ReportIncidenceComponent } from './components/report-incidence/report-incidence.component';
import { SharedModule } from './../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { MostUsedComponent } from './components/most-used/most-used.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [HomePage, MostUsedComponent, ReportIncidenceComponent, MyMapComponent]
})
export class HomePageModule {}
