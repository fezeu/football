import { Component, OnInit , Input, OnChanges, SimpleChanges} from '@angular/core';
import { MessageToHeadService } from '../message-to-head.service';
import { CompteService } from '../client/compte.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() style = [{}];
  constructor(
    private mes : MessageToHeadService,
    private compte: CompteService
  ) {
    
   }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges){
    for (let elm in changes.style.currentValue){
      $('.monHead').css(elm['proprite'],elm['valeur'] )
    }
    
  }
  bye(){
    this.compte.logout()
  }
}
