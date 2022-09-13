import { GlobalService } from './../../../core/services/global/global.service';
/* eslint-disable @typescript-eslint/member-ordering */
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';
// AP205599
@Component({
  selector: 'app-officer-form',
  templateUrl: './officer-form.component.html',
  styleUrls: ['./officer-form.component.scss'],
})
export class OfficerFormComponent implements OnInit {
  @Output() emitFormValue: EventEmitter<any> = new EventEmitter();
  officerForm: FormGroup;
  hide = true;
  hideConfirm = true;
  constructor(private fb: FormBuilder, private authS: AuthService,
    private _sanitizer: DomSanitizer,
    private globalS: GlobalService,
    private loadS: LoadingController
    ) { }

  ngOnInit() {
    this.officerForm = this.fb.group({
      apNumber: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.min(11),Validators.maxLength(11) ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.apNumber.valueChanges.subscribe((e) => {
      if (e.length === 8) {
        console.log(e);
        this.showLoading();
        // this.gotNIN = false;
        this.authS.getAPNumber(e).subscribe((val) => {
          // this.apNumber = val.data;
          console.log(val.data.ResponseObject.ReportRecords[0]);
          const record = val.data.ResponseObject.ReportRecords[0];
          if(record){
            this.officerForm.patchValue({
              email: record.Email,
              phone: record.PhoneNumber,
            });
          }else{
            this.globalS.simpleAlert('Error', '', 'This APNumber is not correct');

          }
          this.loadS.dismiss();
        });
      } else {
        // this.gotNIN = false;
      }
    });
  }

  async showLoading() {
    const loading = await this.loadS.create({
      message: 'Verifying...',
      duration: 3000,
      spinner: 'circles',
    });

    loading.present();
  }

  signup() {
    console.log(this.officerForm.value);
    this.emitFormValue.emit(this.officerForm.value);
  }

   // Easy access for form fields
   get apNumber() {
    return this.officerForm.get('apNumber');
  }
   get username() {
    return this.officerForm.get('username');
  }
  get email() {
    return this.officerForm.get('email');
  }
  get phone() {
    return this.officerForm.get('phone');
  }

  get password() {
    return this.officerForm.get('password');
  }


}
