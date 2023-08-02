import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approve-success',
  templateUrl: './approve-success.component.html',
  styleUrls: ['./approve-success.component.scss'],
})
export class ApproveSuccessComponent implements OnInit {
  @Input() message;
  constructor(private router: Router, private modal: ModalController) {}

  ngOnInit() {}

  navigate() {
    console.log('tsk tsk');
    this.router.navigate(['app/tabs/requests']).then((e) => {
      this.modal.dismiss();
    });
  }
}
