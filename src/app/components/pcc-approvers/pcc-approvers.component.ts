/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pcc-approvers',
  templateUrl: './pcc-approvers.component.html',
  styleUrls: ['./pcc-approvers.component.scss'],
})
export class PccApproversComponent implements OnInit {
  @Input() request;

  @Input() ShowReferenceNumberForm;
  @Input() ApproverId;
  @Input() RequestId;
  showRequestStage = false;
  pccForm: FormGroup;
  constructor(private fb: FormBuilder, private modal: ModalController) {}

  ngOnInit() {
    console.log(this.ShowReferenceNumberForm, this.request);
    if (this.request.ApprovalPartialName.includes('PSSCharacterCertificateRoutingPartial')) {
      this.showRequestStage = true;
      this.pccForm = this.fb.group({
        ApproverId: [this.ApproverId, [Validators.required]],
        RequestId: [this.RequestId, [Validators.required]],
        SelectedRequestStage: ['', [Validators.required]],
        Comment: ['', [Validators.required]],
      });
    }
    else if(!this.ShowReferenceNumberForm){
      this.pccForm = this.fb.group({
        ApproverId: [this.ApproverId, [Validators.required]],
        RequestId: [this.RequestId, [Validators.required]],
        Comment: ['', [Validators.required]],
      });
    }
    else if(this.ShowReferenceNumberForm){
      this.pccForm = this.fb.group({
        ApproverId: [this.ApproverId, [Validators.required]],
        RequestId: [this.RequestId, [Validators.required]],
        RefNumber: ['', [Validators.required]],
        Comment: ['', [Validators.required]],
      });
    }

  }

  get SelectedRequestStage() {
    return this.pccForm.get('SelectedRequestStage');
  }
  get Comment() {
    return this.pccForm.get('Comment');
  }
  get RefNumber() {
    return this.pccForm.get('RefNumber');
  }

  submitForm() {
    console.log(this.pccForm.value);
    this.modal.dismiss(this.pccForm.value);
  }
  dissmissModal() {
    this.modal.dismiss();
  }
}
