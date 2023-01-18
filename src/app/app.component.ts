import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

import { Preferences as Storage } from '@capacitor/preferences';

import { UserData } from './providers/user-data';
import { TranslateConfigService } from './translate-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'Home',
      url: '/app/tabs/home',
      icon: 'calendar',
    },
    {
      title: 'Request',
      url: '/app/tabs/requests',
      icon: 'people',
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle',
    },
  ];
  loggedIn = false;
  applanguage = this.appT.getDefaultLanguage() || 'en';
  dark = false;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private userData: UserData,
    private toastCtrl: ToastController,
    private appT: TranslateConfigService
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();
    console.log(this.applanguage);
    this.appT.setLanguage(this.applanguage);
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      if (this.platform.is('hybrid')) {
        StatusBar.hide();
        SplashScreen.hide();
      }
      const themeMode = await Storage.get({key: 'themeMode'});
      if(themeMode.value){
        this.dark = themeMode.value === 'light' ? false : true;
        document.body.classList.toggle('dark', this.dark);
      }else{
        Storage.set({key: 'themeMode', value: 'light'});
      }
    });
  }

  checkLoginStatus() {
    return this.userData
      .isLoggedIn()
      .then((loggedIn) => this.updateLoggedInStatus(loggedIn));
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData
      .logout()
      .then(() => this.router.navigateByUrl('/app/tabs/schedule'));
  }

  openTutorial() {
    this.menu.enable(false);
    Storage.set({ key: 'ion_did_tutorial', value: 'true' });
    this.router.navigateByUrl('/tutorial');
  }
}
