import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { CreateCompService } from '../create-comp.service';
@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {
  @Input('_id') _id;
  @Output('initialiser')event:EventEmitter <any> = new EventEmitter();
  info_comp = {id:'',nom:'',reglement:'',situation:''}
  constructor(
    private comp: CreateCompService
  ) {
    
   }

  ngOnInit() {
  }
  send_init_info(){
    this.info_comp.id = this._id
    this.comp.initialisation(this.info_comp).subscribe((e)=>{
      if(e['status']){
        alert('informations saved')
       return this.event.emit({init:true})
      }
        if(e['message']=='NotFound'){
          return alert("le tournois n'existe pas")
        }
        alert("une erreur c'est produite "+JSON.stringify( e['message']))
      
    })
  }
}
