/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-assign-tactical-squad-form',
  templateUrl: './assign-tactical-squad-form.component.html',
  styleUrls: ['./assign-tactical-squad-form.component.scss'],
})
export class AssignTacticalSquadFormComponent implements OnInit {
  @Input() request;

  @Input() partialName;
  @Input() ApproverId;
  @Input() RequestId;

  selectedSquadList = [];
  selectedSquadListLabel = [];
  pccForm: FormGroup;
  TacticalSquadIdError = '';
  NumberofOfficersError = '';
  removedItem: any;


  constructor(
    private fb: FormBuilder,
    private modal: ModalController
  ) {}

  ngOnInit() {
    console.log('tactical form');
    this.pccForm = this.fb.group({
      ApproverId: [this.ApproverId, [Validators.required]],
      RequestId: [this.RequestId, [Validators.required]],
      Comment: ['', [Validators.required]],
      TacticalSquadsSelection: this.fb.array([
        new FormGroup({
          TacticalSquadId: new FormControl(''),
          NumberofOfficers: new FormControl(''),
        }),
      ]),
    });
    const AssignedTacticalSquads =
      this.request.Partials[0].PartialModel.AssignedTacticalSquads;
    console.log(AssignedTacticalSquads, 'assigned');
    if (this.request.Partials[0].PartialModel.AssignedTacticalSquads) {
      AssignedTacticalSquads.forEach((assigned) => {
        this.selectedSquadList.push({
          TacticalSquadId: assigned.Command.Id,
          NumberofOfficers: assigned.NumberOfOfficers,
        });
        this.selectedSquadListLabel.push({
          TacticalSquadId: assigned.Command.Id,
          NumberofOfficers: assigned.NumberOfOfficers,
          Name: assigned.Command.Name.split(' - ')[1],
        });
      });
      console.log(this.selectedSquadList, this.selectedSquadListLabel);
    }
  }

  get Comment() {
    return this.pccForm.get('Comment');
  }
  get RefNumber() {
    return this.pccForm.get('RefNumber');
  }

  get TacticalSquadsSelection(): FormArray {
    return this.pccForm.get('TacticalSquadsSelection') as FormArray;
  }
  addSquad() {
    const value = this.TacticalSquadsSelection.value[0];
    if (value.NumberofOfficers !== '' && value.TacticalSquadId !== '') {
      this.TacticalSquadIdError = '';
      this.NumberofOfficersError = '';
      const label = this.request.Partials[0].PartialModel.TacticalSquads.filter(
        (v) => v.Id === value.TacticalSquadId
      )[0];
      this.selectedSquadList.push(value);
      this.selectedSquadListLabel.push({
        NumberofOfficers: value.NumberofOfficers,
        TacticalSquadId: value.TacticalSquadId,
        Name: label.Name.split(' - ')[1],
      });
      this.TacticalSquadsSelection.reset();
    } else {
      this.TacticalSquadIdError =
        value.TacticalSquadId === '' ? 'Select a sqaud' : '';
      this.NumberofOfficersError =
        value.NumberofOfficers === '' ? 'Enter number of officers' : '';
      setTimeout(() => {
        this.TacticalSquadIdError = '';
        this.NumberofOfficersError = '';
      }, 4000);
    }
  }

  removeSquad(i) {
    this.removedItem.push(i);
    this.selectedSquadList = this.selectedSquadList.filter(
      (e) => e.TacticalSquadId !== i.TacticalSquadId
    );
    this.selectedSquadListLabel = this.selectedSquadListLabel.filter(
      (e) => e.TacticalSquadId !== i.TacticalSquadId
    );
  }


  submitForm() {
    const obj = {
      ...this.pccForm.value,
      TacticalSquadsSelection: this.selectedSquadList,
    };
    if (this.removedItem.length > 0) {
      const squads = this.selectedSquadList.map((e) => e.TacticalSquadId);
      const removed = this.removedItem.filter((e) => !squads.includes(e.TacticalSquadId));
      obj.RemovedTacticalSquads = removed;
    }
    console.log(obj);
    this.modal.dismiss(obj);
  }

  dissmissModal() {
    this.modal.dismiss();
  }
}
