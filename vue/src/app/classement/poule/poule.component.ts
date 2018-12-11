import { Component, OnInit } from '@angular/core';
import { CreateCompService } from 'src/app/competition/create-comp.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-poule',
  templateUrl: './poule.component.html',
  styleUrls: ['./poule.component.css']
})
export class PouleComponent implements OnInit {
  poule1:Subject<any[]>=new Subject();
  poule2:Subject<any[]>=new Subject();
  poule3:Subject<any[]>=new Subject();
  id;
  constructor(

    private comp:CreateCompService
  ) { }

  ngOnInit() {
    this.poule1 = this.comp.poule1
    if(sessionStorage.getItem('user'))
    this.id= JSON.parse( sessionStorage.getItem('user'))['tournois'][0];
    this.comp.get_poul(this.id).subscribe((e)=>{
      console.log(e)
    })
  }

}
