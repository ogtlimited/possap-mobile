/* eslint-disable @typescript-eslint/naming-convention */
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PossapServiceService } from './../../core/services/possap-service.service';
import { GlobalService } from './../../core/services/global/global.service';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { AlertController, ModalController } from '@ionic/angular';
import { SelectModalComponent } from 'src/app/components/select-modal/select-modal.component';
import {
  middlewareEndpoints,
  requestEndpoints,
} from 'src/app/core/config/endpoints';
import { environment } from 'src/environments/environment.prod';
import { IOfficerRequest } from 'src/app/core/models/officerRequest.interface';
import { ExtractApproversService } from 'src/app/core/services/extract-approvers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  @Input() selected = null;
  speakers: any[] = [];
  requests: any[] = [];
  completed: any[] = [];
  inProgress: any[] = [];
  searchText = '';
  pending: any[] = [];
  data: any[] = [];
  filteredData: any[] = [];
  selectedFilter: string = null;
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
    private extractS: ExtractApproversService,
    private modal: ModalController,
    private authS: AuthService,
    private router: Router
  ) {}

  ionViewDidEnter() {
    this.authS.currentUser$.subscribe((val) => {
      console.log(val);
      this.officer = val;
      this.getOfficerRequest(val.UserPartId);
    });
  }
  getOfficerRequest(officerId) {
    const headerObj = {
      CLIENTID: environment.clientId,
      // PAYERID: 'BC-0001',
      USERID: officerId,
    };
    const hashString = `${officerId}${headerObj.CLIENTID}`;
    const url = requestEndpoints.allRequest;
    const obj = this.globalS.startEnd();
    console.log(url);
    const body = this.globalS.computeCBSBody(
      'get',
      url,
      headerObj,
      'SIGNATURE',
      hashString,
      obj
    );
    console.log(body);
    this.possapS.postRequests(body).subscribe((req: IOfficerRequest) => {
      console.log(req.data.ResponseObject.Requests);
      this.data = req.data.ResponseObject.Requests.map((e) => ({
        ...e,
        bg: this.getRandomColor(),
      }));
      this.filteredData = this.data;
      this.pending = req.data.ResponseObject.Requests.filter(
        (e) => e.Status === 4
      ).map((e) => ({
        ...e,
        bg: this.getRandomColor(),
      }));
      console.log(this.pending);
      // this.inProgress = req.data.filter((e) => e.status === 'in progress');
      // this.completed = req.data
      //   .filter((e) => e.status === 'approved')
      //   .map((e) => ({
      //     ...e,
      //     bg: this.getRandomColor(),
      //   }));
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
            // const endpoint = this.globalS.getEndpoint(this.request.name);
            this.possapS
              .approveRequests('', id, payload)
              .subscribe((res: any) => {
                console.log(res);
                const message = res?.data?.message;
                this.getOfficerRequest(this.officer.id);
                this.globalS.presentModal(message);
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

  async openModal() {
    const modal = await this.modal.create({
      component: SelectModalComponent,
      cssClass: 'select-modal',
      breakpoints: [0.25],
      componentProps: {
        selected: this.selected,
      },
    });
    modal.present();
    const selectedData = await modal.onWillDismiss();
    this.selectedFilter = selectedData.data;
    this.filteredData = selectedData.data
      ? this.data.filter(
          (e) => e.status.toLowerCase() === this.selectedFilter.toLowerCase()
        )
      : this.data;
  }

  clearFilter() {
    this.selectedFilter = null;
    this.filteredData = this.data;
  }

  navigate(request, id){
    this.router.navigate(['/app/tabs/requests/' + id]);
  }
}
