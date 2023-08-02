/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-egs-approver',
  templateUrl: './egs-approver.component.html',
  styleUrls: ['./egs-approver.component.scss'],
})
export class EgsApproverComponent implements OnInit {
  @Input() request;

  @Input() partialName;
  @Input() ApproverId;
  @Input() RequestId;
  showRequestStage = false;
  requestStageOptions = [];
  pccForm: FormGroup;
  selectedCommandTypeName = 'Tactical';
  constructor(private fb: FormBuilder, private modal: ModalController) {}

  ngOnInit() {
    console.log(this.request, this.partialName);
    this.selectedCommandTypeName =
      this.request.EscortInfo.SelectedCommandTypeName;
    if (this.selectedCommandTypeName === 'Tactical') {
      this.requestStageOptions = this.request.RequestStages.map(e => ({...e, Name: e.Name.split(' - ')[1]}));
      console.log(this.requestStageOptions);
    }
    if (this.request.ApprovalPartialName.includes('PSSEscortRoutingPartial')) {
      this.showRequestStage = true;
      this.pccForm = this.fb.group({
        ApproverId: [this.ApproverId, [Validators.required]],
        RequestId: [this.RequestId, [Validators.required]],
        SelectedRequestStage: ['', [Validators.required]],
        Comment: ['', [Validators.required]],
      });
    } else if (this.partialName === 'PSSEscortApprovalCommentPartial') {
      this.pccForm = this.fb.group({
        ApproverId: [this.ApproverId, [Validators.required]],
        RequestId: [this.RequestId, [Validators.required]],
        Comment: ['', [Validators.required]],
      });
    }
  }
  getRequestStage(event) {
    if (this.selectedCommandTypeName !== 'Tactical') {
      this.SelectedRequestStage.setValue('');
      const val = this.request.RequestStages.filter(
        (e) => e.Id === event.detail.value
      )[0];
      const filter = this.request.RequestStages.filter((e) =>
        e.Name.includes(val.Name)
      );
      const mapped = filter.map((f) => {
        if (f.Name.includes(' - ')) {
          const v = f.Name.split(' - ');
          return { ...f, Name: v[v.length - 1] };
        } else {
          return f;
        }
      });
      this.requestStageOptions = mapped;
      console.log(filter);
      console.log(mapped);
    }
  }

  get SelectedRequestStage() {
    return this.pccForm.get('SelectedRequestStage');
  }
  get Comment() {
    return this.pccForm.get('Comment');
  }

  submitForm() {
    this.modal.dismiss(this.pccForm.value);
  }
  dissmissModal() {
    this.modal.dismiss();
  }
}
