import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-table',
  templateUrl: './preview-table.component.html',
  styleUrls: ['./preview-table.component.scss'],
})
export class PreviewTableComponent implements OnInit {
  @Input() data;
  @Input() service;
  keys = [];
  values = [];
  constructor() {}

  ngOnInit() {
    console.log(this.data);
    if (this.data) {
      this.keys = Object.keys(this.data).map((v) =>
        v.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      );
      this.values = Object.values(this.data);
    }
  }
}
