/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-officer-form',
  templateUrl: './officer-form.component.html',
  styleUrls: ['./officer-form.component.scss'],
})
export class OfficerFormComponent implements OnInit {
  officerForm: FormGroup;
  @Output() emitForm: EventEmitter<any> = new EventEmitter();
  hide = false;
  showOtpP = false;
  showForgotPasswordPageComplete = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.officerForm = this.fb.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }
  get UserName() {
    return this.officerForm.get('UserName');
  }
  get Password() {
    return this.officerForm.get('Password');
  }

  async login() {
    this.emitForm.emit(this.officerForm.value);
  }
}
