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
      title: 'Police Extract',
      code: 'cc',
      subtitle: 'Apply for character certificate',
      icon: 'pe',
    },
    {
      title: 'tintPermit',
      subtitle: 'Apply for tint permit',
      icon: 'tpermit',
      code: 'tp',
    },
    {
      title: 'spy',
      subtitle: 'Apply for spy',
      icon: 'spy',
      code: 'spy',
    },
    {
      title: 'centralMotorRegistry',
      subtitle: 'Apply for escort ad guard services',
      icon: 'cmr',
      code: 'cmr',
    },
    {
      title: 'policeClearanceCertificate',
      subtitle: 'Apply for police clearance certificate using your NIN',
      icon: 'PCC',
      code: 'pcc',
    },
    {
      title: 'escortAndGuardServices',
      subtitle: 'Apply for escort ad guard services',
      icon: 'egs',
      code: 'egs',
    },
  ];
  infoServices = [
    {
      title: 'esignalling',
      subtitle: 'Broadcast to fellow police officers',
      icon: 'CC',
      code: 'es',
    },
    {
      title: 'vehicleServices',
      subtitle: 'Check Vehicle Information during routine checks',
      icon: 'PCC',
      code: 'vs',
    },

    {
      title: 'incidentBooking',
      subtitle: 'Book an Incident',
      icon: 'PCC',
      code: 'ib',
    },
  ];
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  navigate(path, title) {
    console.log(path);
    this.router.navigate(['/general-form'], {
      queryParams: { service: path, title },
    });
  }
}
