import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-most-used',
  templateUrl: './most-used.component.html',
  styleUrls: ['./most-used.component.scss'],
})
export class MostUsedComponent implements OnInit {
  services = [
    {
      title: 'Character Certificate',
      subtitle: 'Apply for character certificate',
      icon: 'CC'
    },
    {
      title: 'Police Clearance Certificate',
      subtitle: 'Apply for police clearance certificate using your NIN',
      icon: 'PCC'
    },
    {
      title: 'Escort and Guard Services',
      subtitle: 'Apply for escort ad guard services',
      icon: 'EGS'
    }
  ]
  constructor() { }

  ngOnInit() {}

}
