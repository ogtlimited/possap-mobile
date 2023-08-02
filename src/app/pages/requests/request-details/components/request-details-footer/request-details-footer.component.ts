/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  LoadingController,
} from '@ionic/angular';
import { PccApproverService } from 'src/app/core/services/approvers/pcc-approver.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ExtractApproversService } from 'src/app/core/services/extract-approvers.service';
import { GlobalService } from 'src/app/core/services/global/global.service';
import { PossapServiceService } from 'src/app/core/services/possap-service.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { DownloadUrl } from 'src/app/core/config/endpoints';
import { EgsService } from 'src/app/core/services/egs.service';
@Component({
  selector: 'app-request-details-footer',
  templateUrl: './request-details-footer.component.html',
  styleUrls: ['./request-details-footer.component.scss'],
})
export class RequestDetailsFooterComponent implements OnInit {
  @Input() request;
  @Input() status;
  @Input() officer;
  @Input() officerDetails;
  @Input() hashString;
  @Input() headerObj;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    public modalController: ModalController,
    public loadingController: LoadingController,
    private possapS: PossapServiceService,
    private extractS: ExtractApproversService,
    private pccS: PccApproverService,
    private egsS: EgsService
  ) {}

  ngOnInit() {
    console.log(this.request);
    console.log(this.status);
    console.log(this.officer);
    console.log(this.officerDetails);
    //Partials[0].PartialName
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
    } else if (request.ServiceName === 'ESCORT AND GUARD SERVICES') {
      if (
        request.ApprovalPartialName.includes('PSSEscortRoutingPartial') ||
        request.Partials[0].PartialName ===
          'PSSEscortSecretariatRoutingApprovalPartial'
      ) {
        this.egsS.routeEGS(
          this.officer.UserPartId,
          request,
          this.hashString,
          this.headerObj
        );
      } else {
        const partialName = request.Partials[0].PartialName;
        this.egsS.ApproveEGS(
          this.officer.UserPartId,
          request,
          this.hashString,
          this.headerObj,
          partialName
        );
      }
    }
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

  async showSuccess(res, msg) {
    const alert = await this.alertController.create({
      header: msg,
      message: res,
      buttons: ['OK'],
    });

    await alert.present();
  }

  eGSFinalApproval(request) {
    this.egsS.finalApproval(
      this.officer.UserPartId,
      request,
      this.hashString,
      this.headerObj
    );
  }
}
