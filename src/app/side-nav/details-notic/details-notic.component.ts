import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/enity/notice';

@Component({
  selector: 'app-details-notic',
  templateUrl: './details-notic.component.html',
  styleUrls: ['./details-notic.component.scss']
})
export class DetailsNoticComponent implements OnInit {
  noticeInfo: Notice;

  constructor() { }

  ngOnInit() {
  }

}
