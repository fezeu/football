import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { CreateCompService } from '../create-comp.service';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.css']
})
export class EquipesComponent implements OnInit {
  joueurs = ['toto']
  @Input('_id') _id;
  @Output('event')event:EventEmitter <any> = new EventEmitter();
  equipe = {id:'',_id:'',nom:'',coach:'',represente:'',banniere:''}
  constructor(
    private comp : CreateCompService
  ) { }

  ngOnInit() {
  }
  new(e){
    if(e)
    this.joueurs.push(e.target.value)
  }
}
