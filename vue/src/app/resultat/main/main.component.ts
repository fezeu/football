import { Component, OnInit } from '@angular/core';
import { MessageToHeadService } from 'src/app/message-to-head.service';
import { CreateCompService } from 'src/app/competition/create-comp.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  id 
  phase_poule
  constructor(
    private mes : MessageToHeadService,
    private comp: CreateCompService
  ) { 
    this.mes.message.emit({object:'affiche'});

    

  }

  ngOnInit() {
  }

}
