import { TranslateConfigService } from './../../translate-config.service';
import { Component, OnInit } from '@angular/core';
import { ConferenceData } from 'src/app/providers/conference-data';
import { UserData } from 'src/app/providers/user-data';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  applanguage = this.appT.getDefaultLanguage() || 'en';
  speakers: any[] = [];
  user;
  searchTerm;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  constructor(
    public confData: ConferenceData,
    private appT: TranslateConfigService,
    private authService: AuthService
  ) {}

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      console.log('speakers', speakers);
      this.speakers = speakers.slice(0, 3);
    });
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
}
