import { Component, OnInit } from '@angular/core';
import { CreateCompService } from 'src/app/competition/create-comp.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-phase-poule',
  templateUrl: './phase-poule.component.html',
  styleUrls: ['./phase-poule.component.css']
})
export class PhasePouleComponent implements OnInit {
  id
  gp1_j1:Subject<any[]> = new Subject();
  gp1_j2:Subject<any[]> = new Subject();
  gp1_j3:Subject<any[]> = new Subject();
  gp2_j1:Subject<any[]> = new Subject();
  gp2_j2:Subject<any[]> = new Subject();
  gp2_j3:Subject<any[]> = new Subject();
  gp3_j1:Subject<any[]> = new Subject();
  gp3_j2:Subject<any[]> = new Subject();
  gp3_j3:Subject<any[]> = new Subject();
  gp4_j1:Subject<any[]> = new Subject();
  gp4_j2:Subject<any[]> = new Subject();
  gp4_j3:Subject<any[]> = new Subject();
  constructor(
    private comp: CreateCompService
  ) {
    
    comp.poule1.subscribe((e)=>{
      let t1 ;
      let t2 ;
      let t3 ;
      let t4 ;
    
      for(let i of e){
        if(i){
          if(i.nom =='GROUPE A'){
            t1 = i;
          }
          if(i.nom =='GROUPE B'){
            t2  = i;
          }
          if(i.nom =='GROUPE C'){
            t3 = i;
          }
          if(i.nom =='GROUPE D'){
            t4 = i;
          }
        }
        
      }
      this.gp1_j1.next([t1.matchs[0],t1.matchs[1]]);
      this.gp1_j2.next([t1.matchs[2],t1.matchs[3]]);
      this.gp1_j3.next([t1.matchs[4],t1.matchs[5]]);
      this.gp2_j1.next([t2.matchs[0],t2.matchs[1]]);
      this.gp2_j2.next([t2.matchs[2],t2.matchs[3]]);
      this.gp2_j3.next([t2.matchs[4],t2.matchs[5]]);
      this.gp3_j1.next([t3.matchs[0],t3.matchs[1]]);
      this.gp3_j2.next([t3.matchs[2],t3.matchs[3]]);
      this.gp3_j3.next([t3.matchs[4],t3.matchs[5]]);
      this.gp4_j1.next([t4.matchs[0],t4.matchs[1]]);
      this.gp4_j2.next([t4.matchs[2],t4.matchs[3]]);
      this.gp4_j3.next([t4.matchs[4],t4.matchs[5]]);
    })
    if(sessionStorage.getItem('user')){
      this.id= JSON.parse( sessionStorage.getItem('user'))['tournois'][0];
      this.comp.get_poul(this.id,1).subscribe((rep)=>{
        
      })
    }else{
      this.id= JSON.parse( sessionStorage.getItem('default'));
      this.comp.get_poul(this.id,1).subscribe((rep)=>{
        
      })
    }
   }

  ngOnInit() {
  }

}
 