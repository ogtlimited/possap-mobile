import { serviceEndpoint } from './../config/endpoints';
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GlobalService } from './global/global.service';
import { PossapServiceService } from './possap-service.service';
import { environment } from 'src/environments/environment.prod';
import { miscEndpoint } from '../config/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ExtractApproversService {
  constructor(
    public alertController: AlertController,
    private possapS: PossapServiceService,
    private globalS: GlobalService
  ) {}

  async extractFirstApprover(officerId, request, hashString, headerObj) {
    const raw = {
      RequestId: request.RequestId,
      ApproverId: officerId,
      Comment: 'Yes this is okay i think this would work',
      DiarySerialNumber: '8275/284892',
      Content:
        'This is the extract that i received at the station in the morning',
      IncidentDate: '20/02/2023',
      IncidentTime: '10:00',
      CrossReferencing: 'hfgshjddae',
    };

    const alert = await this.alertController.create({
      subHeader: 'First Extract Approver',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // this.handlerMessage = `${val} canceled`;
          },
        },
        {
          text: 'Submit',
          role: 'confirm',
          handler: (data) => {
            const date = new Date();
            const payload = {
              RequestId: request.RequestId,
              ApproverId: officerId,
              Comment: data.Comment,
              DiarySerialNumber: data.DiarySerialNumber,
              Content: data.Content,
              IncidentDate: new Date(data.IncidentDate).toLocaleDateString(
                'en-GB'
              ),
              IncidentTime: data.IncidentTime,
              CrossReferencing: data.CrossReferencing,
            };
            const endpoint = this.globalS.getEndpoint(request.ServiceName);
            const body = this.globalS.computeCBSBody(
              'post',
              endpoint,
              headerObj,
              'SIGNATURE',
              hashString,
              payload
            );
            console.log(body);
            this.possapS.postRequests(body).subscribe(
              (res: any) => {
                console.log(res);
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
            // this.handlerMessage = `${val} submitted`;
            console.log(payload);
          },
        },
      ],
      inputs: [
        {
          name: 'DiarySerialNumber',
          placeholder: 'Diary S/No',
        },
        {
          type: 'date',
          name: 'IncidentDate',
          placeholder: 'Incident Date',
        },
        {
          type: 'time',
          name: 'IncidentTime',
          placeholder: 'Incident Time',
        },
        {
          name: 'CrossReferencing',
          placeholder: 'Cross Referencing(C/R)',
        },
        {
          type: 'textarea',
          name: 'Content',
          placeholder: 'Enter a content',
        },
        {
          type: 'textarea',
          name: 'Comment',
          placeholder: 'Leave a comment',
        },
      ],
    });

    await alert.present();
  }
  async extractLastApprover(
    officerId,
    policeOfficerLogId,
    request,
    hashString,
    headerObj
  ) {
    const alert = await this.alertController.create({
      subHeader: 'Last Extract Approver',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // this.handlerMessage = `${val} canceled`;
          },
        },
        {
          text: 'Submit',
          role: 'confirm',
          handler: (data) => {
            const date = new Date();
            const payload = {
              RequestId: request.RequestId,
              ApproverId: officerId,
              SelectedDPOPoliceOfficerLogId: policeOfficerLogId,
              Comment: data.Comment,
            };
            const endpoint = this.globalS.getEndpoint(request.ServiceName);
            const body = this.globalS.computeCBSBody(
              'post',
              endpoint,
              headerObj,
              'SIGNATURE',
              hashString,
              payload
            );
            console.log(body);
            this.possapS.postRequests(body).subscribe(
              (res: any) => {
                console.log(res);
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
            // this.handlerMessage = `${val} submitted`;
            console.log(payload);
          },
        },
      ],
      inputs: [
        {
          type: 'textarea',
          name: 'Comment',
          placeholder: 'Leave a comment',
        },
      ],
    });

    await alert.present();
  }
  async rejectExtrct(
    request,
    hashString,
    headerObj
  ) {
    const alert = await this.alertController.create({
      subHeader: 'Last Extract Approver',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // this.handlerMessage = `${val} canceled`;
          },
        },
        {
          text: 'Submit',
          role: 'confirm',
          handler: (data) => {
            const payload = {
              RequestId: request.RequestId,
              Comment: data.Comment,
            };
            const endpoint = serviceEndpoint.rejectExtract;
            const body = this.globalS.computeCBSBody(
              'post',
              endpoint,
              headerObj,
              'SIGNATURE',
              hashString,
              payload
            );
            console.log(body);
            this.possapS.postRequests(body).subscribe(
              (res: any) => {
                console.log(res);
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
          },
        },
      ],
      inputs: [
        {
          type: 'textarea',
          name: 'Comment',
          placeholder: 'Leave a comment',
        },
      ],
    });

    await alert.present();
  }
}
