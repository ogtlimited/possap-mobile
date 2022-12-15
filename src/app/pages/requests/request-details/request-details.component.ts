import { Component, OnInit } from '@angular/core';
import { PossapServiceService } from './../../../core/services/possap-service.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent implements OnInit {
  state$: Observable<object>;
  request: any = {};
  constructor(
    public activatedRoute: ActivatedRoute,
    private possapS: PossapServiceService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.possapS.getRequest(id).subscribe((res: any) => {
        console.log(res.data);
        this.request = res.data;
      });
      console.log(param.get('id'));
    });
    console.log(window.history.state);
  }
}
