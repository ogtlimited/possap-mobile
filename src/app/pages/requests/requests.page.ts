import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PossapServiceService } from './../../core/services/possap-service.service';
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
  requests: any[] = [];
  completed: any[] = [];
  inProgress: any[] = [];
  pending: any[] = [];
  letters = '0123456789ABCDEF';
  segment = 'completed';
  officer = null;
  handlerMessage = '';
  date = new Date();
  currentTab = 'inProgress';
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1.2,
  };
  languaageObj;
  constructor(
    public confData: ConferenceData,
    private globalS: GlobalService,
    private alertController: AlertController,
    private possapS: PossapServiceService,
    private authS: AuthService
  ) {}

  ionViewDidEnter() {
    this.authS.currentUser$.subscribe((val) => {
      console.log(val);
      this.officer = val;
      this.possapS.getOfficerRequests(val.id).subscribe((req: any) => {
        console.log(req.data);
        this.pending = req.data
          .filter((e) => e.status === 'pending')
          .map((e) => ({
            ...e,
            bg: this.getRandomColor(),
          }));
        this.inProgress = req.data.filter((e) => e.status === 'in progress');
        this.completed = req.data
          .filter((e) => e.status === 'approved')
          .map((e) => ({
            ...e,
            bg: this.getRandomColor(),
          }));
      });
    });
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
    this.currentTab = event.detail.value;
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
      inputs: [
        {
          type: 'textarea',
          name: 'comment',
          placeholder: 'comment',
        },
      ],
    });

    await alert.present();
  }
  navigate(item) {
    console.log(item);
  }
}
