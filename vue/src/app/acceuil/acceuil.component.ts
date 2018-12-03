import { Component, OnInit } from '@angular/core';
import { MessageToHeadService } from '../message-to-head.service';
@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  constructor(
    private mes: MessageToHeadService
  ) { 
    this.mes.message.emit({object:'style',de:'app',style:[{proprite:'background-color',valeur:'#f0f3f5'}]});
    this.mes.message.emit({object:'suphead'})
  }

  ngOnInit() {
  }

}
