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
      console.log(status, 'status');
    });
  }

  async downloadFile(path, fileName) {
    const url = DownloadUrl + '/' + path;
    console.log(url);
    const loading = await this.loadingController.create();
    await loading.present();
    fetch(url, {
      method: 'get',
      mode: 'no-cors',
      referrerPolicy: 'no-referrer',
    })
      .then((res) => res.blob())
      .then((res) => {
        const aElement = document.createElement('a');
        aElement.setAttribute('download', fileName);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        // aElement.setAttribute('href', href);
        aElement.setAttribute('target', '_blank');
        aElement.click();
        URL.revokeObjectURL(href);
        loading.dismiss();
      })
      .catch((err) => {
        loading.dismiss();
      });
  }
}
