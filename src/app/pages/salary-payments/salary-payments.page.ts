import { ModalController, AlertController } from '@ionic/angular';
import { environment } from '../../../environments/environment.prod';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sos',
  templateUrl: './salary-payments.page.html',
  styleUrls: ['./salary-payments.page.scss'],
})
export class SalaryPaymentsPage implements OnInit {
  constructor(private alert: AlertController) {}

  ngOnInit() {}

  ionViewDidEnter() {}

  async presentAlert() {}
  onConfirm() {}
}
