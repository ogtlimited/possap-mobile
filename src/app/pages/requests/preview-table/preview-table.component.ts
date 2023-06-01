/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { ITaxEntity, Ipcc } from 'src/app/core/models/officerRequest.interface';

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
  applicantKey;
  applicantValue;
  constructor() {}

  ngOnInit() {
    console.log(this.data);
    console.log(this.service);
    this.formatApplicant(this.data.TaxEntity);
    if (this.data.ServiceName === 'POLICE EXTRACT') {
      this.formatExtract(this.data);
    } else if (this.data.ServiceName === 'POLICE CHARACTER CERTIFICATE') {
      this.formatPCC(this.data);
    }
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

  formatPCC(data: Ipcc) {
    const pcc = {
      ['Request Reason']: data.Reason,
      ['Country Of Origin']: data.CountryOfOrigin,
      ['State Of Origin']: data.StateOfOrigin,
      ['Date Of Birth']: data.DateOfBirth,
      ['Previously Convicted']: data.IsPreviouslyConvicted,
      ['Destination Country']: data.DestinationCountry,
      ['Country Of Passport']: data.CountryOfPassport,
      ['Passport Number']: data.PassportNumber,
      ['Place of Issuance']: data.PlaceOfIssuance,
      ['Date of Issuance']: data.DateOfIssuance,
    };
    const { keys, values } = this.getKeyValue(pcc);
    this.keys = keys;
    this.values = values;
  }

  formatApplicant(data: ITaxEntity) {
    const info = {
      Name: data.Recipient,
      ['Phone Number']: data.PhoneNumber,
      Email: data.Email,
      ['Selected State']: data.SelectedStateName,
      ['Selected LGA']: data.SelectedLGAName,
      ['Address']: data.Address,
    };
    const { keys, values } = this.getKeyValue(info);
    this.applicantKey = keys;
    this.applicantValue = values;
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
