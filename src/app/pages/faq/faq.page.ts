import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  faqData = [
    {
      question: 'requestDuration',
      answer: 'requestProcess',
    },
    {
      question: 'requestVerificationError',
      answer: 'checkApplicationId',
    },
    {
      question: 'changeRequestInfo',
      answer: 'editRequest',
    },
  ];
  constructor() {}
  ngOnInit() {}
}
