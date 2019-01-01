import { Component, OnInit, Input } from '@angular/core';
import { CreateCompService } from 'src/app/competition/create-comp.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  @Input() idmacht;
  result:Subject<any[]>= new Subject();
  isjouer = false;
  constructor(
    private comp: CreateCompService
  ) {
 
   }

  ngOnInit() {
    this.comp.matchEquipesProvide.subscribe((e)=>{
      if(e['id']!=this.idmacht){
        return false
      }
      e = e['matchEquipes']
      if(e['status']){
        let t =[]
        t = e['message']
        this.isjouer = e['isjouer']
        if(t){
          this.result.next(t);
        }
        
      }
    })
    this.comp.get_equipes_match(this.idmacht)
  }

}
