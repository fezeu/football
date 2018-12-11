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
        $('.menu1').css({
          'position':'fixed',
           'top': 95
        });
        $('.topajuste').css({
          'margin-top':290
        });
      }else{
        $('.menu1').css({
          'position': 'relative',
          'top': 5
        });
        $('.topajuste').css({
          'margin-top':0
        });
      }
    })
  }

}
