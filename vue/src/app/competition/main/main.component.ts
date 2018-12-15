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
           'top': 95,
           'box-shadow': '0px 6px 25px 1px grey',
           'transition': '0.2s  box-shadow ease-in'
        });
        $('.topajuste').css({
          'margin-top':290
        });
        
      }else{
        $('.menu1').css({
          'position':'relative',
          'top':5,
          'box-shadow': '0px 0px 0px 0px grey',
          'transition': '0s  box-shadow ease-in'
        });
        $('.topajuste').css({
          'margin-top': 0
        });
       
      }
    })
  }
 

}
