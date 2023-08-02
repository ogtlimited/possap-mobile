/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { PccApproversComponent } from 'src/app/components/pcc-approvers/pcc-approvers.component';
import {
  miscEndpoint,
  serviceEndpoint,
  utilityEndpoint,
} from '../config/endpoints';
import { GlobalService } from './global/global.service';
import { PossapServiceService } from './possap-service.service';
import { EgsApproverComponent } from 'src/app/components/egs-approver/egs-approver.component';
import { AssignTacticalSquadFormComponent } from 'src/app/components/egs-approver/assign-tactical-squad-form/assign-tactical-squad-form.component';
import { AssignFormationFormComponent } from 'src/app/components/egs-approver/assign-formation-form/assign-formation-form.component';
import { AssignOfficerFormComponent } from 'src/app/components/egs-approver/assign-officer-form/assign-officer-form.component';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class EgsService {
  constructor(
    public alertController: AlertController,
    private possapS: PossapServiceService,
    private globalS: GlobalService,
    private modalCtrl: ModalController,
    private loadingController: LoadingController
  ) {}

  async routeEGS(ApproverId, request, hashString, headerObj) {
    const modal = await this.modalCtrl.create({
      component: EgsApproverComponent,
      cssClass: 'pccModal',
      componentProps: {
        type: 'route-pcc',
        request,
        ApproverId,
        stage: 'routing',
        showTacticalForm: false,
        RequestId: request.RequestId,
      },
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);
      const endpoint = serviceEndpoint.routeEGS;
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
          const message = res?.data?.ResponseObject?.NotificationMessage;
          console.log(message, 'message');
          this.globalS.presentModal(message);
        },
        async (error) => {
          loading.dismiss();
          console.log(error.error.error.ResponseObject);
          const alert = await this.alertController.create({
            header: 'Error',
            message: error.error.error.ResponseObject,
            buttons: ['OK'],
          });
          alert.present();
        }
      );
    }
  }
  async ApproveEGS(ApproverId, request, hashString, headerObj, partialName) {
    let payload: any = {};
    const cssClass = 'pccModal';
    let showTacticalForm = false;
    let showAssignFormationForm = false;
    const modalObj: any = {
      component: EgsApproverComponent,
      cssClass,
      componentProps: {
        request,
        ApproverId,
        showTacticalForm,
        showAssignFormationForm,
        RequestId: request.RequestId,
        partialName,
      },
    };

    if (partialName === 'PSSEscortAssignTacticalSquadPartial') {
      showTacticalForm = true;
      modalObj.component = AssignTacticalSquadFormComponent;
      modalObj.cssClass = '';
    }
    if (
      partialName === 'PSSEscortAssignFormationsPartial' ||
      'PSSEscortDCPPartial'
    ) {
      showAssignFormationForm = true;
      modalObj.component = AssignFormationFormComponent;
      modalObj.cssClass = '';
    }
    if (
      partialName === 'PSSEscortAssignOfficersPartial' ||
      'PSSEscortDPOPartial'
    ) {
      showAssignFormationForm = true;
      modalObj.component = AssignOfficerFormComponent;
      modalObj.cssClass = '';
    }
    console.log(modalObj);
    const modal = await this.modalCtrl.create(modalObj);
    modal.present();
    const { data } = await modal.onWillDismiss();
    payload = data;
    if (payload) {
      console.log(payload);
      const endpoint = serviceEndpoint.approveEGS;
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
          const message = res?.data?.ResponseObject?.NotificationMessage;
          this.globalS.presentModal(message);
          loading.dismiss();
        },
        async (error) => {
          console.log(error.error.error.ResponseObject);
          loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Error',
            message: error.error.error.ResponseObject,
            buttons: ['OK'],
          });
          alert.present();
        }
      );
    }
  }
  async rejectEGS(
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
          const message = res?.data?.ResponseObject?.NotificationMessage;
          console.log(message, 'message');
          this.globalS.presentModal(message);
          loading.dismiss();
        },
        async (error) => {
          loading.dismiss();
          const alert = await this.alertController.create({
            header: 'error',
            message: 'Something went wrong',
            buttons: ['OK'],
          });
          alert.present();
        }
      );
    }
  }

  getFormation(statelgaid, adminId, partial) {
    let endpoint = '';
    if (endpoint === 'PSSEscortAssignFormationsPartial') {
      endpoint =
        utilityEndpoint.adminFormation + '/' + statelgaid + '/' + adminId;
    } else {
      endpoint = utilityEndpoint.lgaFormation + '/' + statelgaid;
    }
    const body = this.globalS.computeCBSBody('get', endpoint, {}, '', '', null);
    return this.possapS.postRequests(body);
  }

  getOfficerLog(apNumber) {
    const headerObj = {
      CLIENTID: environment.clientId,
    };
    const hashString = `${apNumber}${headerObj.CLIENTID}`;
    const endpoint = miscEndpoint.policeOfficerDetails + '/' + apNumber;
    const body = this.globalS.computeCBSBody(
      'get',
      endpoint,
      headerObj,
      'SIGNATURE',
      hashString,
      null
    );
    console.log(body);
    return this.possapS.postRequests(body);
  }

  async finalApproval(ApproverId, request, hashString, headerObj) {
    const payload = {
      ApproverId,
      RequestId: request.RequestId,
    };
    console.log(payload);
    const endpoint = serviceEndpoint.finalEGSApprover;
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
        const message = res?.data?.ResponseObject?.Message;
        console.log(message, 'message');
        this.globalS.presentModal(message);
        loading.dismiss();
      },
      async (error) => {
        console.log(error.error.error?.ResponseObject);
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error',
          message: error.error.error?.ResponseObject,
          buttons: ['OK'],
        });
        alert.present();
      }
    );
  }
}
