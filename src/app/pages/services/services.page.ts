import { ActivatedRoute, Router } from '@angular/router';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  services = [
    {
      title: 'Character Certificate',
      code: 'PS-101',
      subtitle: 'Apply for character certificate',
      icon: 'CC'
    },
    {
      title: 'Police Clearance Certificate',
      subtitle: 'Apply for police clearance certificate using your NIN',
      icon: 'PCC',
      code: 'PS-102',

    },
    {
      title: 'Escort and Guard Services',
      subtitle: 'Apply for escort ad guard services',
      icon: 'EGS',
      code: 'PS-103',
    },
    {
      title: 'Central Motor Registry',
      subtitle: 'Apply for escort ad guard services',
      icon: 'CMR',
      code: 'PS-104',
    }
  ]
  infoServices = [
    {
      title: 'Citizen Report',
      subtitle: 'Apply for character certificate',
      icon: 'CC'
    },
    {
      title: 'SOS',
      subtitle: 'Apply for police clearance certificate using your NIN',
      icon: 'PCC'
    },
    {
      title: 'Police Related News',
      subtitle: 'Apply for escort ad guard services',
      icon: 'EGS'
    },
    {
      title: 'Central Motor Registry',
      subtitle: 'Apply for escort ad guard services',
      icon: 'CMR'
    }
  ]
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  navigate(path){
    this.router.navigate(['/general-form'], {queryParams: {service: path} })
  }

}
