import { Component, OnInit } from '@angular/core';
import { MessageToHeadService } from 'src/app/message-to-head.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  id
  constructor(
    private mes: MessageToHeadService
  ) {
    this.mes.message.emit({object:'affiche'});
    if(sessionStorage.getItem('user'))
    this.id= JSON.parse( sessionStorage.getItem('user'))['tournois'][0]
    console.log(this.id);
   }

  ngOnInit() {
  }

}
