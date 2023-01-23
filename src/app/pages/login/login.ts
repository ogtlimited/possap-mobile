import { OnInit } from '@angular/core';
/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage implements OnInit {
  officerForm: FormGroup;
  hide = true;
  userType = 'resident';
  officer = null;
  showOTPPage = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((val) => {
      console.log(val);
      this.officer = val;
    });
    this.authService.isAuthenticated.subscribe((isAuth) => {
      console.log(isAuth);
      if (isAuth) {
        // Directly open inside area
        this.router.navigate(['app/tabs/home']);
      }
    });
    this.officerForm = this.fb.group({
      apNumber: ['', [Validators.required]],
    });
  }

  changeUser(val) {
    this.userType = val;
  }

  async login(val) {
    const loading = await this.loadingController.create();
    await loading.present();
    console.log(val);

    this.authService.login(val).subscribe(
      async (res) => {
        this.showOTPPage = true;
        await loading.dismiss();
        // this.router.navigate(['menu/home']);
      },
      async (res) => {
        console.log(res);
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.error,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  async validateOTP(val) {
    const loading = await this.loadingController.create();
    await loading.present();
    const obj = {
      code: val.value.passcode,
      phone: this.officer.phoneNumber,
      apNumber: this.officer.apNumber,
    };
    console.log(obj);
    this.authService.validateOTP(obj).subscribe(
      async (res) => {
        this.showOTPPage = false;
        console.log(res);
        await loading.dismiss();
        this.router.navigate(['app/tabs/home']);
      },
      async (res) => {
        console.log(res);
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.error,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  async reqFailed(res, msg) {
    const alert = await this.alertController.create({
      header: msg,
      message: res,
      buttons: ['OK'],
    });

    await alert.present();
  }
  // Easy access for form fields

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get apNumber() {
    return this.officerForm.get('apNumber');
  }
}
