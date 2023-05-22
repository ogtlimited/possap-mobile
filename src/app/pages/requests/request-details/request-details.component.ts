/* eslint-disable @typescript-eslint/naming-convention */
import { AuthService } from './../../../core/services/auth/auth.service';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { GlobalService } from './../../../core/services/global/global.service';
import { Component, OnInit } from '@angular/core';
import { PossapServiceService } from './../../../core/services/possap-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { requestEndpoints } from 'src/app/core/config/endpoints';
import { environment } from 'src/environments/environment.prod';
import { IOfficerRequestDetails } from 'src/app/core/models/officerReqDetails.interface';
import { ExtractApproversService } from 'src/app/core/services/extract-approvers.service';
import { IOfficerDetails } from 'src/app/core/models/login.interface';

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
    private extractS: ExtractApproversService
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
        this.extractS.rejectExtrct(
          request,
          this.hashString,
          this.headerObj
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
  }
}
