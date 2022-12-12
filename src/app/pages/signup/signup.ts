/* eslint-disable @typescript-eslint/member-ordering */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
export class SignupPage implements OnInit {
  pwd = 'password';
  hide = true;
  hideConfirm = true;
  showVerify = false;
  userType = 'resident';
  errorLogin = false;
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
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  changeUser(val) {
    this.userType = val;
  }

  async signup(val) {
    const loading = await this.loadingController.create();
    await loading.present();
    console.log(val);
    // setTimeout(async () => {
    //   await loading.dismiss();
    //   this.showVerify = true;
    // }, 2500);
    // return;
    this.authService.signup(val).subscribe(
      async (res) => {
        await loading.dismiss();
        this.showVerify = true;
        // this.router.navigate(["menu/home"]);
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
    // to be removed

    setTimeout(() => {
      loading.dismiss();
      this.router.navigate(['menu/home']);
    }, 2000);

    // continue
    const value = passForm.get('passcode').value;
    const obj = {
      verificationCode: value,
      email: this.email.value,
    };
    console.log(value); //30919176644
  //   this.authService.validateOTP(obj).subscribe(
  //     async (res) => {
  //       await loading.dismiss();
  //       this.router.navigate(['menu/home']);
  //     },
  //     async (res) => {
  //       console.log(res);
  //       await loading.dismiss();
  //       const alert = await this.alertController.create({
  //         header: res.error.message,
  //         message: res.error.error,
  //         buttons: ['OK'],
  //       });

  //       await alert.present();
  //     }
  //   );
  }
}
