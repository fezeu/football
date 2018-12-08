import { Component, OnInit, Input } from '@angular/core';
import { CreateCompService } from 'src/app/competition/create-comp.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  @Input('id') idmacht;
  result:Subject<any[]>
  constructor(
    private comp: CreateCompService
  ) {
    this.comp.get_equipes_match(this.idmacht).subscribe((e)=>{
      if(e['status']){
        this.result.next(e['message'])
      }
    })
   }

  ngOnInit() {
  }

}
