import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-possap-eye',
  templateUrl: './possap-eye.component.html',
  styleUrls: ['./possap-eye.component.scss'],
})
export class PossapEyeComponent implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {}

  dismiss(){
    this.modal.dismiss()

  }

}
