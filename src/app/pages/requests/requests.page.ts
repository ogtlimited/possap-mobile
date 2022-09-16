import { GlobalService } from './../../core/services/global/global.service';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  speakers: any[] = [];
  letters = '0123456789ABCDEF';
  segment = 'completed';
  handlerMessage = '';
  date = new Date();
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1.2,
  };
  languaageObj;
  constructor(
    public confData: ConferenceData,
    private globalS: GlobalService,
    private alertController: AlertController
  ) {}

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers.map((e) => ({
        ...e,
        bg: this.getRandomColor(),
      }));
    });
  }

  async ngOnInit() {
    this.languaageObj = await this.globalS.getTranslateObject();
    console.log(this.languaageObj);
  }
  getRandomColor() {
    let color = '#'; // <-----------
    for (let i = 0; i < 6; i++) {
      color += this.letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  favorite() {}
  share() {}
  unread() {}

  segmentChanged(event) {
    console.log(event.detail.value);
  }
  async presentAlert(val) {
    const alert = await this.alertController.create({
      header: val,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = `${val} canceled`;
          },
        },
        {
          text: 'Submit',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = `${val} submitted`;
            console.log(this.handlerMessage);
          },
        },
      ],
    });

    await alert.present();
  }
}
