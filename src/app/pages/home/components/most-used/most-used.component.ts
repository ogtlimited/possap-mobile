import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-most-used',
  templateUrl: './most-used.component.html',
  styleUrls: ['./most-used.component.scss'],
})
export class MostUsedComponent implements OnInit {
  services = [
    {
      title: 'E-signaling',
      subtitle: 'Apply for E-signaling',
      icon: 'CC',
    },
    {
      title: 'Incident Booking',
      subtitle: 'Apply for Incident Booking',
      icon: 'PCC',
    },
    {
      title: 'Vehicle Services',
      subtitle: 'Apply for Vehicle Services',
      icon: 'EGS',
    },
  ];
  constructor(private router: Router) {}

  ngOnInit() {}

  navigate(path, title) {
    console.log(path);
    this.router.navigate(['/general-form'], {
      queryParams: { service: path, title },
    });
  }
}
