import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertController, ToastController } from '@ionic/angular';
import { TranslateConfigService } from '../../translate-config.service';
import { Preferences as Storage } from '@capacitor/preferences';


@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
  styleUrls: ['./support.scss'],
})
export class SupportPage implements OnInit {
  submitted = false;
  supportMessage: string;
  dark = false;
  applanguage = this.appT.getDefaultLanguage() || 'en';
  customActionSheetOptions = {
    header: 'Language',
    subHeader: 'Change Langugae',
  };

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private appT: TranslateConfigService
  ) { }

  async ionViewDidEnter() {
    console.log(this.applanguage);
    this.appT.setLanguage(this.applanguage);
    const toast = await this.toastCtrl.create({
      message: 'This does not actually send a support request.',
      duration: 3000
    });
    await toast.present();
  }

  async submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.supportMessage = '';
      this.submitted = false;

      const toast = await this.toastCtrl.create({
        message: 'Your support request has been sent.',
        duration: 3000
      });
      await toast.present();
    }
  }

  langchange(evt) {
    console.log(evt.detail.value);
    this.applanguage = evt.detail.value;
    this.appT.setLanguage(evt.detail.value);
  }

  toggleDarkTheme(shouldAdd) {
    const mode = shouldAdd ? 'light' : 'dark';
    Storage.set({key: 'themeMode', value: mode });
    document.body.classList.toggle('dark', !shouldAdd);
  }

  ngOnInit() {
    const setToggle = async () => {
      const themeMode = await Storage.get({key: 'themeMode'});
      if(themeMode.value){
        this.dark = themeMode.value === 'light' ? false : true;
        document.body.classList.toggle('dark', this.dark);
      }else{
        Storage.set({key: 'themeMode', value: 'light'});
      }
    };
    setToggle();
  }

  // If the user enters text in the support question and then navigates
  // without submitting first, ask if they meant to leave the page
  // async ionViewCanLeave(): Promise<boolean> {
  //   // If the support message is empty we should just navigate
  //   if (!this.supportMessage || this.supportMessage.trim().length === 0) {
  //     return true;
  //   }

  //   return new Promise((resolve: any, reject: any) => {
  //     const alert = await this.alertCtrl.create({
  //       title: 'Leave this page?',
  //       message: 'Are you sure you want to leave this page? Your support message will not be submitted.',
  //       buttons: [
  //         { text: 'Stay', handler: reject },
  //         { text: 'Leave', role: 'cancel', handler: resolve }
  //       ]
  //     });

  //     await alert.present();
  //   });
  // }
}
