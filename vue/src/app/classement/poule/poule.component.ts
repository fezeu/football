import { Component, OnInit } from '@angular/core';
import { CreateCompService } from 'src/app/competition/create-comp.service';
import { Subject } from 'rxjs';
import { isArray } from 'util';

@Component({
  selector: 'app-poule',
  templateUrl: './poule.component.html',
  styleUrls: ['./poule.component.css']
})
export class PouleComponent implements OnInit {
  poule1:Subject<any[]>=new Subject();
  poule2:Subject<any[]>=new Subject();
  poule3:Subject<any[]>=new Subject();
  id;
  constructor(

    private comp:CreateCompService
  ) { }

  ngOnInit() {
    this.comp.poule1.subscribe((e)=>{
      let t1 = [];
      let t2 = [];
      let t3 = [];
      let t4 = [];
      if(e.length != 0){
        for(let i=0;i<4;i++){
          if(e[i].nom =='GROUPE A'){
            t1 = e [i];
          }
          if(e[i].nom =='GROUPE B'){
            t2 = e [i];
          }
          if(e[i].nom =='GROUPE C'){
            t3 = e [i];
          }
          if(e[i].nom =='GROUPE D'){
            t4 = e [i];
          }
          this.poule1.next([t1,t2,t3,t4]);
  
        }
      }
      
    })
    if(sessionStorage.getItem('user'))
    this.id= JSON.parse( sessionStorage.getItem('user'))['tournois'][0];
    this.comp.get_poul(this.id).subscribe((e)=>{
      console.log(e)
    })
  }

}
