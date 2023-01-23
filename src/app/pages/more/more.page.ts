import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserData } from 'src/app/providers/user-data';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
  items = [
    {
      title: 'profile',
      path: '/account',
      icon: 'person-circle-outline',
    },
    {
      title: 'settings',
      path: '/support',
      icon: 'settings-outline',
    },
    // {
    //   title: 'salaryPayments',
    //   path: '/salary-payment',
    //   icon: 'cash-outline',
    // },
    {
      title: 'privacyPolicy',
      path: '/privacy',
      icon: 'book-outline',
    },
    {
      title: 'FAQS',
      path: '/faq',
      icon: 'help-circle-outline',
    },
  ];
  constructor(
    public popoverCtrl: PopoverController,
    private router: Router,
    private userData: UserData,
    private authS: AuthService
  ) {}

  ngOnInit() {}

  logout() {
    this.authS
      .logout()
      .then(() => this.router.navigateByUrl('/login'));
  }
}
