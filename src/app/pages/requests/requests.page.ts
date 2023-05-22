/* eslint-disable @typescript-eslint/naming-convention */
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PossapServiceService } from './../../core/services/possap-service.service';
import { GlobalService } from './../../core/services/global/global.service';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import {
  AlertController,
  IonModal,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { SelectModalComponent } from 'src/app/components/select-modal/select-modal.component';
import {
  middlewareEndpoints,
  miscEndpoint,
  requestEndpoints,
} from 'src/app/core/config/endpoints';
import { environment } from 'src/environments/environment.prod';
import { IOfficerRequest } from 'src/app/core/models/officerRequest.interface';
import { ExtractApproversService } from 'src/app/core/services/extract-approvers.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  @Input() selected = null;
  @ViewChild(IonModal) inlineModal: IonModal;
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
  filterForm: FormGroup;
  ServiceRequestTypes = [];
  States = [];
  LGAs = [];
  Commands = [];

  constructor(
    private fb: FormBuilder,
    public confData: ConferenceData,
    private globalS: GlobalService,
    private alertController: AlertController,
    private possapS: PossapServiceService,
    private extractS: ExtractApproversService,
    private modal: ModalController,
    private authS: AuthService,
    private router: Router,
    private loader: LoadingController
  ) {
    this.filterForm = this.fb.group({
      from: [
        formatDate(
          new Date(new Date().getFullYear(), 0, 1),
          'yyyy-MM-dd',
          'en'
        ),
        [Validators.required],
      ],
      end: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      serviceType: ['', []],
      state: ['', []],
      lga: ['', []],
      selectedCommand: ['', []],
      selectedRequestPhase: ['', []],
    });
  }
  get selectedCommand() {
    return this.filterForm.get('selectedCommand');
  }
  get lga() {
    return this.filterForm.get('lga');
  }
  get state() {
    return this.filterForm.get('state');
  }
  get serviceType() {
    return this.filterForm.get('serviceType');
  }
  get selectedRequestPhase() {
    return this.filterForm.get('selectedRequestPhase');
  }
  get end() {
    return this.filterForm.get('end');
  }
  get from() {
    return this.filterForm.get('from');
  }

  ionViewDidEnter() {
    this.authS.currentUser$.subscribe((val) => {
      console.log(val);
      this.officer = val;
      const query = this.globalS.startEnd();
      this.getOfficerRequest(val.UserPartId, query);
    });
  }
  async getOfficerRequest(officerId, query) {
    const headerObj = {
      CLIENTID: environment.clientId,
      // PAYERID: 'BC-0001',
      USERID: officerId,
    };
    const hashString = `${officerId}${headerObj.CLIENTID}`;
    const url = this.globalS.getUrlString(requestEndpoints.allRequest, query);
    console.log(url);
    const body = this.globalS.computeCBSBody(
      'get',
      url,
      headerObj,
      'SIGNATURE',
      hashString,
      null
    );
    console.log(body);
    const loading = await this.loader.create({
      message: 'Loading...',
      duration: 3000,
      cssClass: 'custom-loading',
    });

    loading.present();
    this.possapS.postRequests(body).subscribe(
      (req: IOfficerRequest) => {
        console.log(req.data.ResponseObject);
        const { StateLGAs, ServiceRequestTypes } = req.data.ResponseObject;
        this.States = StateLGAs;
        this.ServiceRequestTypes = ServiceRequestTypes;
        console.log(this.States);
        this.data = req.data.ResponseObject.Requests.map((e) => ({
          ...e,
          bg: this.getRandomColor(),
        }));
        this.filteredData = this.data;
        loading.dismiss();
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
      },
      async () => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error fetching request',
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  async ngOnInit() {
    this.languaageObj = await this.globalS.getTranslateObject();
    console.log(this.languaageObj);
    this.state.valueChanges.subscribe((v) => {
      console.log(v);
      this.LGAs = this.States.filter((s) => s.Id === v)[0].LGAs;
      console.log(this.LGAs);
    });
    this.lga.valueChanges.subscribe((v) => {
      const body = this.globalS.computeCBSBody(
        'get',
        miscEndpoint.getLgaAreaAndDivisionalCommand + '/' + v,
        {},
        '',
        '',
        null
      );
      console.log(body);
      this.possapS.postRequests(body).subscribe((res) => {
        console.log(res.data.ResponseObject.stateLga);
        this.Commands = res.data.ResponseObject.stateLga;
      });
      // this.LGAs = this.States.filter(s => s.Id === v)[0].LGAs;
    });
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
                const query = this.globalS.startEnd();
                this.getOfficerRequest(this.officer.id, query);
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

  dismiss() {
    this.inlineModal.dismiss();
  }
  submitFilter() {
    const { value } = this.filterForm;
    value.from = new Date(value.from).toLocaleDateString('en-GB');
    value.end = new Date(value.end).toLocaleDateString('en-GB');
    const query = Object.keys(value)
      .filter((key) => value[key] !== '')
      .reduce((cur, key) => Object.assign(cur, { [key]: value[key] }), {});
    console.log(query, this.officer);
    this.getOfficerRequest(this.officer.UserPartId, query);
  }

  clearFilter() {
    this.selectedFilter = null;
    this.filteredData = this.data;
  }

  navigate(request, id) {
    this.router.navigate(['/app/tabs/requests/' + id]);
  }
}
