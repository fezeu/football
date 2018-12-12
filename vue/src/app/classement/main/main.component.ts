import { Component, OnInit } from '@angular/core';
import { MessageToHeadService } from '../../message-to-head.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private mes : MessageToHeadService
  ) { 
    this.mes.message.emit({object:'affiche'});
  }

  ngOnInit() {
    $(document).on('scroll',function(){
      let height = $('.tete').outerHeight();
      if(height<=90){

        $('.topajuste').css({
          'margin-top':290
        });
      }else{
 
        $('.topajuste').css({
          'margin-top':0
        });
      }
    })
  }

}
