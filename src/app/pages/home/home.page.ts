import { TranslateConfigService } from './../../translate-config.service';
import { Component, OnInit } from '@angular/core';
import { ConferenceData } from 'src/app/providers/conference-data';
import { UserData } from 'src/app/providers/user-data';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { PossapServicesService } from 'src/app/core/services/possap-services/possap-services.service';
import { LoadingController } from '@ionic/angular';
import { IService, ServiceResponse } from 'src/app/core/models/ResponseModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  applanguage = this.appT.getDefaultLanguage() || 'en';
  speakers: any[] = [];
  activeServices = [
    'police character certificate',
    'police character certificate diaspora',
    'police extract',
  ];
  user;
  searchTerm;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  services: IService[];

  constructor(
    public confData: ConferenceData,
    private appT: TranslateConfigService,
    private authService: AuthService,
    private router: Router,
    private possapS: PossapServicesService,
    private loader: LoadingController
  ) {}

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      console.log('speakers', speakers);
      this.speakers = speakers.slice(0, 3);
    });
    this.fetchCBSServices();
  }

  ngOnInit() {
    this.authService.currentUser().subscribe((str) => {
      const user = JSON.parse(str.value);
      console.log('users', user);
      this.user = user;
    });
  }

  getBg(num) {
    return `url(assets/img/home/img${num + 1}.png)`;
  }
  submit() {}

  presentModal(){

  }

  async fetchCBSServices(){
    const loading = await this.loader.create({
      message: 'Loading...',
      duration: 3000,
      cssClass: 'custom-loading',
    });

    loading.present();
      // console.log(schema);
      this.possapS.fetchCBSServices().subscribe((s: ServiceResponse) => {
        // console.log(s);
        loading.dismiss();
        this.services = s.ResponseObject.services.filter((v) => this.activeServices.includes(v.Name.toLowerCase()));
        console.log(this.services);
      });

  }

  navigate(path, title, type = '') {
    console.log(path);
    this.router.navigate(['/app/tabs/requests'], {
      queryParams: { service: path, title, type },
    });
  }
}
