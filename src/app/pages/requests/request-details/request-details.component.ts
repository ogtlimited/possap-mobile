import { AuthService } from './../../../core/services/auth/auth.service';
import { AlertController } from '@ionic/angular';
import { GlobalService } from './../../../core/services/global/global.service';
import { Component, OnInit } from '@angular/core';
import { PossapServiceService } from './../../../core/services/possap-service.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent implements OnInit {
  state$: Observable<object>;
  request: any = null;
  handlerMessage: string;
  officer: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private possapS: PossapServiceService,
    private globalS: GlobalService,
    private authS: AuthService
  ) {}

  ionViewDidEnter() {
    this.authS.currentUser$.subscribe((val) => {
      console.log(val);
      this.officer = val;
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.possapS.getRequest(id).subscribe((res: any) => {
        console.log(res.data);
        this.request = res.data;
      });
      console.log(param.get('id'));
    });
    console.log(window.history.state);
  }

  async presentAlert(val, id) {
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
          handler: (data) => {
            const date = new Date();
            const payload = {
              officerId: this.officer.id,
              status: `${val}`,
              timeOfApproval: date,
              comment: data.message,
            };
            this.possapS.approveRequests(id, payload).subscribe((res) => {
              console.log(res);
            });
            this.handlerMessage = `${val} submitted`;
            console.log(payload);
          },
        },
      ],
      inputs: [
        {
          type: 'textarea',
          name: 'message',
          placeholder: 'message',
        },
      ],
    });

    await alert.present();
  }

  ionViewDidLeave() {
    this.globalS.showTabs$.next(true);
  }
  ionViewWillEnter() {
    console.log('enter');
    this.globalS.showTabs$.next(false);
  }
}
