/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { EgsService } from 'src/app/core/services/egs.service';

@Component({
  selector: 'app-assign-officer-form',
  templateUrl: './assign-officer-form.component.html',
  styleUrls: ['./assign-officer-form.component.scss'],
})
export class AssignOfficerFormComponent implements OnInit {
  @Input() request;

  @Input() partialName;
  @Input() ApproverId;
  @Input() RequestId;

  selectedOfficers = [];
  selectedOfficersLabel = [];
  pccForm: FormGroup;
  TacticalSquadIdError = '';
  NumberofOfficersError = '';
  removedItem = [];

  constructor(
    private fb: FormBuilder,
    private modal: ModalController,
    private auths: AuthService,
    private egs: EgsService,
    public alertController: AlertController,
    public loader: LoadingController
  ) {}

  ngOnInit() {
    console.log('assign officer form', this.request);
    this.pccForm = this.fb.group({
      ApproverId: [this.ApproverId, [Validators.required]],
      RequestId: [this.RequestId, [Validators.required]],
      Comment: ['', [Validators.required]],
      apNumber: [''],
    });
    const addedOfficers =
      this.request.Partials[0].PartialModel.ProposedEscortOffficers;
      console.log(addedOfficers);
      if (addedOfficers) {
      addedOfficers.forEach((assigned) => {
        this.selectedOfficers.push({
          PoliceOfficerLogId: assigned.FormationId,
        });
        this.selectedOfficersLabel.push({
          RankCode: assigned.FormationId,
          Name: assigned.NumberOfOfficers,
          CommandName: assigned.OfficerCommandName,
          IppisNumber: assigned.OfficerIPPISNumber,
          AccountNumber: assigned.OfficerAccountNumber,
          IdNumber: assigned.OfficerIdentificationNumber,
          PoliceOfficerLogId: assigned.PoliceOfficerLogId,
        });
      });
      console.log(this.selectedOfficersLabel);
    }
  }

  get Comment() {
    return this.pccForm.get('Comment');
  }
  get apNumber() {
    return this.pccForm.get('apNumber');
  }

  get TacticalSquadsSelection(): FormArray {
    return this.pccForm.get('TacticalSquadsSelection') as FormArray;
  }
  async addSquad() {
    const load = await this.loader.create();
    load.present();
    const { value } = this.apNumber;
    this.apNumber.setValue('');
    this.egs.getOfficerLog(value).subscribe(async (res) => {
      console.log(res.data);
      if (typeof res.data.ResponseObject !== 'string') {
        const IdNumber = res.data.ResponseObject.IdNumber;
        const officer = this.selectedOfficersLabel.filter(
          (o) => o.IdNumber === IdNumber
        );
        if (officer.length === 0) {
          this.selectedOfficersLabel.push(res.data.ResponseObject);
          this.selectedOfficers.push({
            PoliceOfficerLogId: res.data.ResponseObject.PoliceOfficerLogId,
          });
        } else {
          this.showError('Officer already in list');
        }
        load.dismiss();
      } else {
        load.dismiss();
        this.showError(res.data.ResponseObject);
      }
    });
  }

  removeSquad(i) {
    this.removedItem.push(i);
    this.selectedOfficers = this.selectedOfficers.filter(
      (e) => e.PoliceOfficerLogId !== i.PoliceOfficerLogId
    );
    this.selectedOfficersLabel = this.selectedOfficersLabel.filter(
      (e) => e.PoliceOfficerLogId !== i.PoliceOfficerLogId
    );
  }

  submitForm() {
    const { apNumber, ...others } = this.pccForm.value;
    const obj = {
      ...others,
      OfficersSelection: this.selectedOfficers,
    };
    // if (this.removedItem.length > 0) {
    //   const squads = this.selectedOfficers.map((e) => e.TacticalSquadId);
    //   const removed = this.removedItem.filter(
    //     (e) => !squads.includes(e.TacticalSquadId)
    //   );
    //   obj.RemovedTacticalSquads = removed;
    // }
    console.log(obj);
    this.modal.dismiss(obj);
  }

  async showError(msg) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK'],
    });
    alert.present();
  }

  dissmissModal() {
    this.modal.dismiss();
  }
}
