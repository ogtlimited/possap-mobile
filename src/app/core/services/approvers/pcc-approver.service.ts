/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { serviceEndpoint } from '../../config/endpoints';
import { GlobalService } from '../global/global.service';
import { PossapServiceService } from '../possap-service.service';
import { PccApproversComponent } from 'src/app/components/pcc-approvers/pcc-approvers.component';

@Injectable({
  providedIn: 'root',
})
export class PccApproverService {
  constructor(
    public alertController: AlertController,
    private possapS: PossapServiceService,
    private globalS: GlobalService,
    private modalCtrl: ModalController,
    private loadingController: LoadingController
  ) {}

  async routePCC(ApproverId, request, hashString, headerObj) {
    const modal = await this.modalCtrl.create({
      component: PccApproversComponent,
      cssClass: 'pccModal',
      componentProps: {
        type: 'route-pcc',
        request,
        ApproverId,
        RequestId: request.RequestId,
      },
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);
      const endpoint = serviceEndpoint.routePcc;
      const body = this.globalS.computeCBSBody(
        'post',
        endpoint,
        headerObj,
        'SIGNATURE',
        hashString,
        data
      );
      console.log(body);
      const loading = await this.loadingController.create();
      await loading.present();
      this.possapS.postRequests(body).subscribe(
        (res: any) => {
          console.log(res);
          loading.dismiss();
          const message = res?.data?.message;
          this.globalS.presentModal(message);
        },
        (error) => {
          this.alertController.create({
            header: 'error',
            message: 'Something went wrong',
            buttons: ['OK'],
          });
        }
      );
    }
  }
  async approvePCC(
    ApproverId,
    request,
    hashString,
    headerObj,
    ShowReferenceNumberForm,
    policeOfficerLogId
  ) {
    let payload: any = {};
    const modal = await this.modalCtrl.create({
      component: PccApproversComponent,
      cssClass: 'pccModal',
      componentProps: {
        ShowReferenceNumberForm,
        request,
        ApproverId,
        RequestId: request.RequestId,
      },
    });
    modal.present();
    const { data } = await modal.onWillDismiss();
    payload = data;
    if (request.IsLastApprover) {
      payload.SelectedCPCCRPoliceOfficerLogId = policeOfficerLogId;
    }
    if (payload) {
      console.log(payload);
      const endpoint = serviceEndpoint.approvePcc;
      const body = this.globalS.computeCBSBody(
        'post',
        endpoint,
        headerObj,
        'SIGNATURE',
        hashString,
        payload
      );
      console.log(body);
      const loading = await this.loadingController.create();
      await loading.present();
      this.possapS.postRequests(body).subscribe(
        (res: any) => {
          console.log(res);
          const message = res?.data?.message;
          this.globalS.presentModal(message);
          loading.dismiss();
        },
        (error) => {
          loading.dismiss();
          this.alertController.create({
            header: 'error',
            message: 'Something went wrong',
            buttons: ['OK'],
          });
        }
      );
    }
  }
  async rejectPCC(
    ApproverId,
    request,
    hashString,
    headerObj,
    policeOfficerLogId
  ) {
    let payload: any = {};
    const modal = await this.modalCtrl.create({
      component: PccApproversComponent,
      cssClass: 'pccModal',
      componentProps: {
        ShowReferenceNumberForm: false,
        request,
        ApproverId,
        RequestId: request.RequestId,
      },
    });
    modal.present();
    const { data } = await modal.onWillDismiss();
    payload = data;
    payload.SelectedCPCCRPoliceOfficerLogId = policeOfficerLogId;
    if (payload) {
      console.log(payload);
      const endpoint = serviceEndpoint.rejectPcc;
      const body = this.globalS.computeCBSBody(
        'post',
        endpoint,
        headerObj,
        'SIGNATURE',
        hashString,
        payload
      );
      console.log(body);
      const loading = await this.loadingController.create();
      await loading.present();
      this.possapS.postRequests(body).subscribe(
        (res: any) => {
          console.log(res);
          const message = res?.data?.message;
          this.globalS.presentModal(message);
          loading.dismiss();
        },
        (error) => {
          loading.dismiss();
          this.alertController.create({
            header: 'error',
            message: 'Something went wrong',
            buttons: ['OK'],
          });
        }
      );
    }
  }
}
