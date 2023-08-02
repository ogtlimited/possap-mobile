/* eslint-disable @typescript-eslint/naming-convention */
import { AuthService } from './../../../core/services/auth/auth.service';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { GlobalService } from './../../../core/services/global/global.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PossapServiceService } from './../../../core/services/possap-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DownloadUrl, requestEndpoints } from 'src/app/core/config/endpoints';
import { environment } from 'src/environments/environment.prod';
import { IOfficerRequestDetails } from 'src/app/core/models/officerReqDetails.interface';
import { ExtractApproversService } from 'src/app/core/services/extract-approvers.service';
import { IOfficerDetails } from 'src/app/core/models/login.interface';
import { PccApproverService } from 'src/app/core/services/approvers/pcc-approver.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent implements OnInit {
  state$: Observable<object>;
  request: any = null;
  status = 'pending';
  serviceName = '';
  handlerMessage: string;
  officer: any;
  officerDetails: IOfficerDetails;
  hashString = '';
  headerObj: {
    CLIENTID: string;
    // PAYERID: 'BC-0001',
    USERID: any;
  };
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    public modalController: ModalController,
    public loadingController: LoadingController,
    private possapS: PossapServiceService,
    private globalS: GlobalService,
    private authS: AuthService,
    private extractS: ExtractApproversService,
    private pccS: PccApproverService,
    private cdref: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.authS.currentOfficerDetails$.subscribe(
      (e) => (this.officerDetails = e)
    );
    this.authS.currentUser$.subscribe((val) => {
      // console.log(val);
      this.officer = val;

      this.activatedRoute.paramMap.subscribe((param) => {
        const id = param.get('id');
        this.headerObj = {
          CLIENTID: environment.clientId,
          USERID: this.officer.UserPartId,
        };
        this.hashString = `${this.headerObj.USERID}${id}${this.headerObj.CLIENTID}`;
        const url = requestEndpoints.requestDetails + '/' + id;
        const obj = this.globalS.startEnd();
        const body = this.globalS.computeCBSBody(
          'get',
          url,
          this.headerObj,
          'SIGNATURE',
          this.hashString,
          null
        );
        // console.log(body);
        this.possapS.postRequests(body).subscribe(
          (res: IOfficerRequestDetails) => {
            console.log(res.data.ResponseObject);
            loading.dismiss();
            this.request = res.data.ResponseObject;
            this.serviceName =
              res.data.ResponseObject.ServiceName.toLowerCase();
            // this.cdref.detectChanges();
            if (this.request.IsLastApprover) {
              this.requestApNumber();
            }
          },
          (err) => {
            console.log(err.error.error.ResponseObject);
            this.showSuccess(err.error.error.ResponseObject, 'Error');
            loading.dismiss();
          }
        );
      });
    });
  }

  ionViewDidLeave() {
    this.globalS.showTabs$.next(true);
  }
  ionViewWillEnter() {
    console.log('enter');
    this.globalS.showTabs$.next(false);
    this.activatedRoute.queryParamMap.subscribe((query) => {
      this.status = query.get('status');
    });
  }

  async showSuccess(res, msg) {
    const alert = await this.alertController.create({
      header: msg,
      message: res,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async requestApNumber() {
    const alert = await this.alertController.create({
      message: 'Enter your AP Number',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // this.handlerMessage = `${val} canceled`;
            this.router.navigate(['app/tabs/requests']);
          },
        },
        {
          text: 'Submit',
          role: 'confirm',
          handler: async (data) => {
            console.log(data);
            (await this.authS.getOfficerLog(data.apNumber)).subscribe(
              async (res) => {
                console.log(res);
              },
              async (res) => {
                console.log(res);
                const errorAlert = await this.alertController.create({
                  header: 'Login failed',
                  message: res.error.error,
                  buttons: ['OK'],
                });

                await errorAlert.present();
              }
            );
          },
        },
      ],
      inputs: [
        {
          type: 'text',
          name: 'apNumber',
          placeholder: 'AP Number',
        },
      ],
    });

    await alert.present();
  }
}
