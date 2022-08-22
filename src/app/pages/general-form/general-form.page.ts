import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-general-form",
  templateUrl: "./general-form.page.html",
  styleUrls: ["./general-form.page.scss"],
})
export class GeneralFormPage implements OnInit {
  myParam: any;
  jsonFormData
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      console.log(params);

      this.myParam = params.service;

      console.log(this.myParam);
    }
  );

  }

  submitForm(val) {
    console.log(val);
  }
}
