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
  jour1:Subject<any[]> = new Subject();
  jour2:Subject<any[]> = new Subject();
  jour3:Subject<any[]> = new Subject();
  constructor(
    private comp: CreateCompService
  ) {
    
    comp.poule1.subscribe((e)=>{
      let tab1=[]
      let tab2 = []
      let tab3 = []
      for(let i of e){
        tab1.push(i.matchs[0],i.matchs[1])
        tab2.push(i.matchs[2],i.matchs[3])
        tab3.push(i.matchs[4],i.matchs[5])
      }
      this.jour1.next(tab1);
      this.jour2.next(tab2);
      this.jour3.next(tab3)
    })
    if(sessionStorage.getItem('user')){
      this.id= JSON.parse( sessionStorage.getItem('user'))['tournois'][0];
      this.comp.get_poul(this.id,1).subscribe((rep)=>{
        
      })
    }
   }

  ngOnInit() {
  }

}
 