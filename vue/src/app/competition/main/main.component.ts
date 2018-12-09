import { Component, OnInit } from '@angular/core';
import { MessageToHeadService } from 'src/app/message-to-head.service';
import { CreateCompService } from '../create-comp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  poule = false;
  tour = false
  id
  constructor(
    private mes: MessageToHeadService,
    private comp: CreateCompService,
    private route: Router
  ) {
    this.mes.message.emit({object:'affiche'});
    if(sessionStorage.getItem('user'))
    this.id= JSON.parse( sessionStorage.getItem('user'))['tournois'][0];
    this.comp.get_status(this.id).subscribe((e)=>{
      if(e['status']){
        if(e['status']=='incomplet1'){
          this.poule = true
          this.route.navigate['./phase_poule'];
        }else{
          this.tour =true
        }
      }else{
        this.tour =true
      }
    })
   }

  ngOnInit() {
  }
  tournois(){
    console.log(this.id)
    this.comp.create_tournois(this.id).subscribe((e)=>{
      if(e['status']){
        this.poule = true
        this.route.navigate['./phase_poule']
      }
    })
  }
}
