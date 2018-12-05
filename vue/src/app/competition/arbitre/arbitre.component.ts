import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { CreateCompService } from '../create-comp.service';
@Component({
  selector: 'app-arbitre',
  templateUrl: './arbitre.component.html',
  styleUrls: ['./arbitre.component.css']
})
export class ArbitreComponent implements OnInit {
  @Input('_id') _id;
  @Output('initialiser')event:EventEmitter <any> = new EventEmitter();
  constructor(
    private comp : CreateCompService
  ) { }

  ngOnInit() {
  }
  save(){
    
  }
}
