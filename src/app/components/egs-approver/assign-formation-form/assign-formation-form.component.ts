/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Formations } from './sample-formation';
import { EgsService } from 'src/app/core/services/egs.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-assign-formation-form',
  templateUrl: './assign-formation-form.component.html',
  styleUrls: ['./assign-formation-form.component.scss'],
})
export class AssignFormationFormComponent implements OnInit {
  @Input() request;

  @Input() partialName;
  @Input() ApproverId;
  @Input() RequestId;
  @Input() showTacticalForm;
  @Input() showAssignFormationForm;
  showRequestStage = false;
  formationOptions = [];
  selectedFormationList = [];
  selectedFormationListLabel = [];
  pccForm: FormGroup;
  FormationIdError = '';
  NumberofOfficersError = '';
  removedItem = [];
  officer = null;
  constructor(
    private fb: FormBuilder,
    private modal: ModalController,
    private egs: EgsService,
    private authS: AuthService
  ) {}

  ngOnInit() {
    console.log(this.request);
    this.authS.currentUser$.subscribe((e) => {
      console.log(e);
      this.officer = e;
    });
    this.pccForm = this.fb.group({
      ApproverId: [this.ApproverId, [Validators.required]],
      RequestId: [this.RequestId, [Validators.required]],
      Comment: ['', [Validators.required]],
      FormationsSelection: this.fb.array([
        new FormGroup({
          FormationId: new FormControl(''),
          FormationName: new FormControl(''),
          NumberofOfficers: new FormControl(''),
        }),
      ]),
    });
    const FormationsAllocated =
      this.request.Partials[0].PartialModel.FormationsAllocated;
    this.formationOptions = Formations;
    if (FormationsAllocated) {
      FormationsAllocated.forEach((assigned) => {
        this.selectedFormationList.push({
          FormationId: assigned.FormationId,
          NumberofOfficers: assigned.NumberOfOfficers,
        });
        this.selectedFormationListLabel.push({
          FormationId: assigned.FormationId,
          NumberofOfficers: assigned.NumberOfOfficers,
          Name: assigned.FormationName,
        });
      });
    }
  }

  get Comment() {
    return this.pccForm.get('Comment');
  }

  get FormationsSelection(): FormArray {
    return this.pccForm.get('FormationsSelection') as FormArray;
  }
  addSquad() {
    const value = this.FormationsSelection.value[0];
    if (value.NumberofOfficers !== '' && value.FormationId !== '') {
      this.FormationIdError = '';
      this.NumberofOfficersError = '';
      const label = this.formationOptions.filter(
        (v) => v.Id === value.FormationId
      )[0];
      this.selectedFormationList.push(value);
      this.selectedFormationListLabel.push({
        NumberofOfficers: value.NumberofOfficers,
        FormationId: value.FormationId,
        Name: label.Name,
      });
      this.FormationsSelection.reset();
    } else {
      this.FormationIdError =
        value.FormationId === '' ? 'Select a formation' : '';
      this.NumberofOfficersError =
        value.NumberofOfficers === '' ? 'Enter number of officers' : '';
      setTimeout(() => {
        this.FormationIdError = '';
        this.NumberofOfficersError = '';
      }, 4000);
    }
  }
  removeSquad(i) {
    this.removedItem.push(i);
    this.selectedFormationList = this.selectedFormationList.filter(
      (e) => e.FormationId !== i.FormationId
    );
    this.selectedFormationListLabel = this.selectedFormationListLabel.filter(
      (e) => e.FormationId !== i.FormationId
    );
  }
  getStateFormation(ev) {
    console.log(ev);
    const state = ev.detail.value;
    this.egs
      .getFormation(state, this.officer.UserPartId, this.partialName)
      .subscribe((res) => {
        console.log(res);
        if (this.partialName === 'PSSEscortAssignFormationsPartial') {
          this.formationOptions = res.data.ResponseObject.Commands;
        } else {
          this.formationOptions = res.data.ResponseObject.stateLga;
        }
      });
  }

  submitForm() {
    const obj = {
      ...this.pccForm.value,
      FormationsSelection: this.selectedFormationList,
    };
    if (this.removedItem.length > 0) {
      const squads = this.selectedFormationList.map((e) => e.FormationId);
      const removed = this.removedItem.filter(
        (e) => !squads.includes(e.FormationId)
      );
      obj.RemovedFormations = removed;
    }
    console.log(obj);
    this.modal.dismiss(obj);
  }
  dissmissModal() {
    this.modal.dismiss();
  }
}
