import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CreateCompService } from 'src/app/competition/create-comp.service';

@Component({
  selector: 'app-finale',
  templateUrl: './finale.component.html',
  styleUrls: ['./finale.component.css']
})
export class FinaleComponent implements OnInit {
  id
  matchs:Subject<any[]> = new Subject();
  constructor(
    private comp:CreateCompService
  ) {
    this.comp.poule4.subscribe((e)=>{
      let m1;
      
  
      for(let i of e){
        if(i){
         
          if(i.nom == 'MATCH 7'){
            m1 = i;
          }
 
          
        }
        
      }
      if(m1){
        this.matchs.next([m1])
      }
      
    })
    if(sessionStorage.getItem('user')){
      this.id= JSON.parse( sessionStorage.getItem('user'))['tournois'][0];
      this.comp.get_poul(this.id, 4).subscribe((rep)=>{
        
      })
    }else{
      this.id= JSON.parse( sessionStorage.getItem('default'));
      this.comp.get_poul(this.id, 4).subscribe((rep)=>{
        
      })
    }
   }

  ngOnInit() {
  }

}
