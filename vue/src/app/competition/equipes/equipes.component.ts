import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { CreateCompService } from '../create-comp.service';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.css']
})
export class EquipesComponent implements OnInit {
  @Input('_id') _id;
  @Output('equipe')event:EventEmitter <any> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

}
