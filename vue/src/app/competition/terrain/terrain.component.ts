import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { CreateCompService } from '../create-comp.service';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.css']
})
export class TerrainComponent implements OnInit {
  @Input('_id') _id;
  @Output('terrain') event:EventEmitter <any> = new EventEmitter();
  terrains = {id:'',_id:'',nom:'',nombre_place:'',sitaution:''}
  constructor(
    private comp: CreateCompService
  ) { }

  ngOnInit() {
  }
  save(){
    this.terrains.id = this._id;
    this.comp.set_terrain(this.terrains).subscribe((e)=>{
      if(e['status']){
        this.event.emit(true)
      }
    })
    return false
  }
}
