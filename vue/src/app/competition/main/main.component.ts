import { Component, OnInit } from '@angular/core';
import { MessageToHeadService } from 'src/app/message-to-head.service';
import { CreateCompService } from '../create-comp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  poule = false;
  tour = false
  id;
  private Tstatus
  constructor(

  ) {
   
    

   }

  ngOnInit() {
    $(document).on('scroll',function(){
      let height = $('.tete').outerHeight();
      if(height<=95){
        $('.menu1').css({
          'position':'fixed',
           'top': 95
        });
        $('.topajuste').css({
          'margin-top':290
        });
      }else{
        $('.menu1').css({
          'position':'relative',
          'top':5
        });
        $('.topajuste').css({
          'margin-top':0
        });
      }
      
    })
  }
 

}
