import { Component, OnInit } from '@angular/core';
import { CreateCompService } from 'src/app/competition/create-comp.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-demi',
  templateUrl: './demi.component.html',
  styleUrls: ['./demi.component.css']
})
export class DemiComponent implements OnInit {
  id
  matchs:Subject<any[]> = new Subject();
  constructor(
    private comp:CreateCompService
  ) {
    this.comp.poule3.subscribe((e)=>{
      let m1;
      let m2 ;
   
   
      for(let i of e){
        if(i){
    
          if(i.nom == 'MATCH 5'){
            m1 = i;
          }
          if(i.nom == 'MATCH 6'){
            m2 = i;
          }
          
        }
        
      }
      if(m1 && m2){
        this.matchs.next([m1,m2])
      }
      
    })
    if(sessionStorage.getItem('user')){
      this.id= JSON.parse( sessionStorage.getItem('user'))['tournois'][0];
      this.comp.get_poul(this.id,3).subscribe((rep)=>{
        
      })
    }
   }

  ngOnInit() {
  }

}
