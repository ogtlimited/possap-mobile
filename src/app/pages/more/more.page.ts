import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { UserData } from 'src/app/providers/user-data';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  items = [
    {
      title: 'Profile',
      path: '/account',
      icon: 'person-circle-outline',
    },
    {
      title: 'Settings',
      path: '/support',
      icon: 'settings-outline'
    },
    {
      title: 'Salary Payments',
      path: '/salary-payment',
      icon: 'cash-outline'
    },
    {
      title: 'Legal',
      path: '/legal',
      icon: 'book-outline'
    },
  ];
  constructor(
    public popoverCtrl: PopoverController,
    private router: Router,
    private userData: UserData
  ) {}

  ngOnInit() {}

  logout() {
    this.userData
      .logout()
      .then(() => this.router.navigateByUrl('/app/tabs/schedule'));
  }
}
