import { Component, OnInit } from '@angular/core';
import { MessageToHeadService } from 'src/app/message-to-head.service';
import { CreateCompService } from '../create-comp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-comp',
  templateUrl: './new-comp.component.html',
  styleUrls: ['./new-comp.component.css']
})
export class NewCompComponent implements OnInit {
  poule = false;
  tour = false
  id;
  constructor(
    private mes: MessageToHeadService,
    private comp: CreateCompService,
    private route: Router
  ) { 
    this.mes.message.emit({object:'affiche'});
    if(sessionStorage.getItem('user')){
      this.id= JSON.parse( sessionStorage.getItem('user'))['tournois'][0];
     
    }
  }

  ngOnInit() {
    
  }
  tournois(){
    console.log(this.id)
    this.comp.create_tournois(this.id).subscribe((e)=>{
      if(e['status']){
        this.tour =false
        this.poule = true
        this.route.navigate(['/competition/phase_poule']);
        sessionStorage.setItem('Tstatus',e['status']);
      }
    })
  }
}
