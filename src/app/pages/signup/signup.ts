import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
// eslint-disable-next-line @typescript-eslint/naming-convention
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth/auth.service';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  pwd = 'password';
  hide = true;
  hideConfirm = true;
  showVerify = false;
  userType = 'resident'
  errorLogin= false;
  InvalidCode = false;
  confirmP = 'password';
  residentForm: FormGroup;
  officerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private cdref: ChangeDetectorRef,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.officerForm = this.fb.group({
      apNumber: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.min(11),Validators.maxLength(11) ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.residentForm = this.fb.group({
      fullName: ['', [Validators.required]],
      preferredUserName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      nin: ['', [Validators.required, Validators.min(11),Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.min(11),Validators.maxLength(11) ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  changeUser(val){
    this.userType = val
  }

  async signup() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.signup(this.residentForm.value).subscribe(
      async (res) => {
        await loading.dismiss();
        // this.showVerify = true;
        this.router.navigate(['menu/home']);
      },
      async (res) => {
        console.log(res);
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: res.error.message,
          message: res.error.error,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  // Easy access for form fields
  get fullName() {
    return this.residentForm.get('fullName');
  }
  get email() {
    return this.residentForm.get('email');
  }
  get phone() {
    return this.residentForm.get('phone');
  }

  get password() {
    return this.residentForm.get('password');
  }
  async continue(passForm: FormGroup) {
    const loading = await this.loadingController.create();
    await loading.present();
    const value = passForm.get('passcode').value;
    const obj = {
      verificationCode: value,
      email: this.email.value
    };
    console.log(value);//30919176644
    this.authService.activateAccount(obj).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigate(['menu/home']);
      },
      async (res) => {
        console.log(res);
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: res.error.message,
          message: res.error.error,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }
}
