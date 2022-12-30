import { GlobalService } from './../../core/services/global/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PossapEyeComponent } from './possap-eye/possap-eye.component';
import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs-page.html',
  styleUrls: ['./tabs-page.scss'],
})
export class TabsPage {
  showTabs;
  constructor(private modal: ModalController, private globalS: GlobalService) {
     this.globalS.showTabs$.subscribe( val => this.showTabs = val);
  }

  ionViewDidEnter() {
    // document.querySelector('#tab-button-tab3').shadowRoot.querySelector('.button-native').setAttribute('style', 'margin-top: -2px');
  }

  async presentModal() {
    const modal = await this.modal.create({
      component: PossapEyeComponent,
    });

    modal.present();
  }
}
