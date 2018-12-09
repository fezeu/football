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
  constructor(
    private comp: CreateCompService
  ) {
 
   }

  ngOnInit() {
    this.comp.get_equipes_match(this.idmacht).subscribe((e)=>{
      if(e['status']){
        let t =[]
        t = e['message']
        if(t){
          console.log(t);
          this.result.next(t);
        }
        
      }
    })
  }

}
