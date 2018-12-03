import { Component, OnInit } from '@angular/core';
import { MessageToHeadService } from 'src/app/message-to-head.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private mes: MessageToHeadService
  ) {
    this.mes.message.emit({object:'suphead'})
   }

  ngOnInit() {
  }

}
