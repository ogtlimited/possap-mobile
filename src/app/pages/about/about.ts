import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PopoverController } from '@ionic/angular';
import { UserData } from '../../providers/user-data';

import { PopoverPage } from '../about-popover/about-popover';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {
  location = 'madison';
  conferenceDate = '2047-05-17';

  selectOptions = {
    header: 'Select a Location'
  };

  constructor(public popoverCtrl: PopoverController,
    private router: Router,
    private userData: UserData) { }

    logout() {
      this.userData.logout().then(() => this.router.navigateByUrl('/app/tabs/schedule'));
    }
  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }
}
