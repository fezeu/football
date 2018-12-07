import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { CreateCompService } from '../create-comp.service';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.css']
})
export class EquipesComponent implements OnInit {
  joueurs = []
  @Input('_id') _id;
  @Output('event')event:EventEmitter <any> = new EventEmitter();
  equipe = {id:'',_id:'',nom:'',coach:'',represente:'',banniere:''}
  constructor(
    private comp : CreateCompService
  ) { }

  ngOnInit() {
  }
  neww(e){
    if(e)
    this.joueurs.push(e)
  }
  add(){
    this.equipe.id = this._id;
    this.comp.set_equipe(this.equipe).subscribe((e)=>{
      if([e['status']]){
        this.joueurs = []
      }
    })
  }
}
