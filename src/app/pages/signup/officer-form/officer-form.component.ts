import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-officer-form',
  templateUrl: './officer-form.component.html',
  styleUrls: ['./officer-form.component.scss'],
})
export class OfficerFormComponent implements OnInit {
  officerForm: FormGroup;
  hide = true;
  hideConfirm = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.officerForm = this.fb.group({
      apNumber: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.min(11),Validators.maxLength(11) ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
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

  signup(){
    console.log(this.officerForm.value)
  }

}
