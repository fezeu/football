import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CreateCompService } from '../create-comp.service';


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
      }
      this.gp1_j1.next([t1.matchs[0],t1.matchs[4]]);
      this.gp1_j2.next([t1.matchs[1],t1.matchs[3]]);
      this.gp1_j3.next([t1.matchs[2],t1.matchs[5]]);
      this.gp2_j1.next([t2.matchs[0],t2.matchs[1]]);
      this.gp2_j2.next([t2.matchs[2],t2.matchs[5]]);
      this.gp2_j3.next([t2.matchs[3],t2.matchs[4]]);
      this.gp3_j1.next([t3.matchs[0],t3.matchs[5]]);
      this.gp3_j2.next([t3.matchs[1],t3.matchs[2]]);
      this.gp3_j3.next([t3.matchs[3],t3.matchs[4]]);
      this.gp4_j1.next([t4.matchs[0],t4.matchs[3]]);
      this.gp4_j2.next([t4.matchs[1],t4.matchs[5]]);
      this.gp4_j3.next([t4.matchs[2],t4.matchs[4]]);
     
    })
    if(sessionStorage.getItem('user')){
      this.id= JSON.parse( sessionStorage.getItem('user'))['tournois'][0];
      this.comp.get_poul(this.id,1)
    }else{
      this.id= JSON.parse( sessionStorage.getItem('default'))['tournois'];
      this.comp.get_poul(this.id,1)
    }
  }

  ngOnInit() {
  }
  quart(){
    this.comp.init_quart(this.id).subscribe((e)=>{
      if(e['status']){
        alert('quart');
      }
    })
  }
}
