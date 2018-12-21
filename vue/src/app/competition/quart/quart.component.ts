import { Component, OnInit } from '@angular/core';
import { CreateCompService } from '../create-comp.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-quart',
  templateUrl: './quart.component.html',
  styleUrls: ['./quart.component.css']
})
export class QuartComponent implements OnInit {
  id
  matchs:Subject<any[]> = new Subject();
  constructor(
    private comp:CreateCompService
  ) { 
    this.comp.poule2.subscribe((e)=>{
      let m1;
      let m2 ;
      let m3 ;
      let m4 ;
      console.log(e)
      for(let i of e){
        if(i){
          console.log(i)
          if(i.nom == 'MATCH 1'){
            m1 = i;
          }
          if(i.nom == 'MATCH 2'){
            m2 = i;
          }
          if(i.nom == 'MATCH 3'){
            m3 = i
          }
          if(i.nom == 'MATCH 4'){
            m4 = i
          }
        }
        
      }
      if(m1 && m2 && m3 && m4){
        this.matchs.next([m1,m2,m3,m4]);
      }
      
    })
    if(sessionStorage.getItem('user')){
      this.id= JSON.parse( sessionStorage.getItem('user'))['tournois'][0];
      this.comp.get_poul(this.id,2).subscribe((rep)=>{
        
      })
    }else{
      this.id= JSON.parse( sessionStorage.getItem('default'));
      this.comp.get_poul(this.id,2).subscribe((rep)=>{
        
      })
    }
  }

  ngOnInit() {
  }
  demi(){
    this.comp.init_demi(this.id).subscribe((e)=>{
      if(e['status']){
        alert("tout c'est bien passer")
      }
    })
  }
}
