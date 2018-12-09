import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { CreateCompService } from '../create-comp.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  @Input() idmacht;
  result:Subject<any[]>= new Subject();
  constructor(
    private comp:CreateCompService
  ) { }

  ngOnInit() {
    this.comp.get_equipes_match(this.idmacht).subscribe((e)=>{
      if(e['status']){
        let t =[]
        t = e['message']
        if(t){
          this.result.next(t);
        }
        
      }
    })
  }

}
