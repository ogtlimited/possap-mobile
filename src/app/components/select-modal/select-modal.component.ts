import { Component,Input,OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss'],
})
export class SelectModalComponent implements OnInit {
  @Input() selected = null;
  list: Array<string> = ['Pending','Approved','Rejected'];
  constructor(
    private modal: ModalController
  ) {

   }

  ngOnInit() {
    console.log('list',this.list);
    console.log('selectedFilter',this.selected);
  }
  selectItem(val: string) {
    console.log({val});
    this.selected = val;
  }
  save() {
    this.modal.dismiss(this.selected);
  }
}
