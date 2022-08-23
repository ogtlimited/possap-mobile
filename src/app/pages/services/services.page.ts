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
      code: 'cc',
      subtitle: 'Apply for character certificate',
      icon: 'CC'
    },
    {
      title: 'Police Clearance Certificate',
      subtitle: 'Apply for police clearance certificate using your NIN',
      icon: 'PCC',
      code: 'pcc',

    },
    {
      title: 'Escort and Guard Services',
      subtitle: 'Apply for escort ad guard services',
      icon: 'EGS',
      code: 'egs',
    },
    {
      title: 'Central Motor Registry',
      subtitle: 'Apply for escort ad guard services',
      icon: 'CMR',
      code: 'cmr',
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
      title: 'Incident Booking',
      subtitle: 'Book your Incidents',
      icon: 'PCC'
    },
    {
      title: 'Vehicle Service',
      subtitle: 'Get Vehicle Information using your vehicle ID',
      icon: 'PCC'
    },
    {
      title: 'Esignal',
      subtitle: 'Broadcast messages to your fellow police colleagues',
      icon: 'PCC'
    },

   
   
  ]
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  navigate(path){
    this.router.navigate(['/general-form'], {queryParams: {service: path} })
  }

}
