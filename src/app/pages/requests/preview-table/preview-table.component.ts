/* eslint-disable @typescript-eslint/naming-convention */
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
    // if (this.data) {
    //   this.keys = Object.keys(this.data).map((v) =>
    //     v.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    //   );
    //   this.values = Object.values(this.data);
    // }
    this.formatExtract(this.data);
  }

  formatExtract(raw) {
    const extract = {
      ['Request Reason']: raw.SelectedExtractCategories.map(
        (e) => e.RequestReason.split(':')[1]
      ).join(', '),
      IsIncidentReported: raw.IsIncidentReported,
      AffidavitNumber: raw.AffidavitNumber,
      AffidavitDateOfIsssuance: raw.AffidavitDateOfIsssuance
        ? new Date(raw.AffidavitDateOfIsssuance).toLocaleDateString()
        : '',
    };
    const { keys, values } = this.getKeyValue(extract);
    this.keys = keys;
    this.values = values;
    // console.log();
  }

  getKeyValue(data) {
    if (data) {
      const keys = Object.keys(data).map((v) =>
        v.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      );
      const values = Object.values(data);
      return { keys, values };
      // return keys.map((e, i) => {
      //   console.log(e, values[i]);
      //   return {
      //     [e]: values[i],
      //   };
      // });
    }
  }
}
