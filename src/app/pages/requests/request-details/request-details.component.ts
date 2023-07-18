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
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
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
      console.log(val);
      this.officer = val;

      this.activatedRoute.paramMap.subscribe((param) => {
        console.log(param);
        const id = param.get('id');
        //requestEndpoints.requestDetails
        this.headerObj = {
          CLIENTID: environment.clientId,
          // PAYERID: 'BC-0001',
          USERID: this.officer.UserPartId,
        };
        this.hashString = `${this.headerObj.USERID}${id}${this.headerObj.CLIENTID}`;
        const url = requestEndpoints.requestDetails + '/' + id;
        const obj = this.globalS.startEnd();
        console.log(url);
        const body = this.globalS.computeCBSBody(
          'get',
          url,
          this.headerObj,
          'SIGNATURE',
          this.hashString,
          null
        );
        console.log(body);
        this.possapS
          .postRequests(body)
          .subscribe((res: IOfficerRequestDetails) => {
            console.log(res.data.ResponseObject);
            loading.dismiss();
            this.request = res.data.ResponseObject;
            this.serviceName =
              res.data.ResponseObject.ServiceName.toLowerCase();
            this.cdref.detectChanges();
            if (this.request.IsLastApprover) {
              this.requestApNumber();
            }
          });
        console.log(param.get('id'));
      });
    });
  }

  async presentAlert(val, request) {
    if (request?.ServiceName === 'POLICE EXTRACT') {
      if (val === 'Approve' && request.IsLastApprover === false) {
        this.extractS.extractFirstApprover(
          this.officer.UserPartId,
          request,
          this.hashString,
          this.headerObj
        );
      } else if (val === 'Approve' && request.IsLastApprover === true) {
        console.log('last approver', this.officerDetails);
        this.extractS.extractLastApprover(
          this.officer.UserPartId,
          this.officerDetails.PoliceOfficerLogId,
          request,
          this.hashString,
          this.headerObj
        );
      } else {
        this.extractS.rejectExtrct(request, this.hashString, this.headerObj);
      }
    } else if (request.ServiceName === 'POLICE CHARACTER CERTIFICATE') {
      if (val === 'Approve') {
        if (
          request.ApprovalPartialName.includes(
            'PSSCharacterCertificateRoutingPartial'
          )
        ) {
          this.pccS.routePCC(
            this.officer.UserPartId,
            request,
            this.hashString,
            this.headerObj
          );
        } else {
          this.pccS.approvePCC(
            this.officer.UserPartId,
            request,
            this.hashString,
            this.headerObj,
            this.request.ShowReferenceNumberForm,
            this.officerDetails.PoliceOfficerLogId
          );
        }
      } else {
        this.pccS.rejectPCC(
          this.officer.UserPartId,
          request,
          this.hashString,
          this.headerObj,
          this.officerDetails.PoliceOfficerLogId
        );
      }
    }
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

  async downloadFile(path, fileName) {
    //const url = 'https://file-examples.com/wp-content/storage/2017/10/file-sample_150kB.pdf';
    const url = DownloadUrl + '/' + path;
    console.log(url);

    const loading = await this.loadingController.create();
    await loading.present();
    const obj = {
      url,
    };
    this.possapS.downloadApprovedRequest(obj).subscribe(
      async (res: any) => {
        console.log(res.data);
        //const val = this.base64ToPdf(res.data, fileName);
        await Filesystem.writeFile({
          path: fileName + '.pdf',
          data: res.data,
          directory: Directory.Documents,
        });
        this.showSuccess('Successfully download file', fileName + '.pdf');
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        this.showSuccess('Error downloading file', err.message);
        loading.dismiss();
      }
    );
  }
  blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
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
