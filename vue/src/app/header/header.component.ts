import { Component, OnInit , Input, OnChanges, SimpleChanges} from '@angular/core';
import { MessageToHeadService } from '../message-to-head.service';
import { CompteService } from '../client/compte.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
    men=true;
  @Input() style = [{}];
  slideIndex = 0;
  constructor(
    private mes : MessageToHeadService,
    private compte: CompteService
  ) {
    
   }

  ngOnInit() {
    
  //this.showSlides();
  let mesimage =['foot10.jpg','image.jpg','foot15.jpg','foot18.jpg'];
  let i = 0;
  let Height = 480;
  let max = 280
  let Width1 = $(document).outerWidth();
  if(Width1<=480){
    Height = 280
    max = 180
  }else{
    Height = 480
    max = 280
  }
  $(document).on('resize',()=>{
    Width1 = $(document).outerWidth();
    if(Width1<=480){
      Height = 280
      max = 180
    }else{
      Height = 480
      max=280
    }
  })
  setInterval(()=>{
   $('.navbar ul li').on('click',(e)=>{
    e.preventDefault();
    $(".active").removeClass('active');
    $(e.target).addClass('active');
   })
   $('#content').css({
      'background-image':`url(/assets/${mesimage[i%4]})`
    })
    i = (4+i+1)%4
  },10000)
  $(document).on('scroll',()=>{
   let opacite = 1- $(document).scrollTop()/180;
   let height = Height- $(document).scrollTop()
   if(opacite<0)opacite=0;
   if(!this.men){
    $('#apphead').css({
      'position':'fixed', 
      'top':'0',
      'max-height': 280
     })
   }else{
    if(height< max ){
    
      height=80
      $('#apphead').css({
       'position':'fixed', 
       'top':'0',
       'max-height': height
      })
 
     }else{
       $('#apphead').css({
         'position':'relative',
         'top':'-5px',
         'max-height': height,
        // 'transform': `translate3d(0,${height},0)`
        })
       }
   }
   

    $('#content').css({ 
      'opacity': opacite,
      
    })
    
});

document.getElementById("menu").onclick=()=>{
    if(this.men){
    $(".navbar ").css({
        "display":"block"
        })
    this.men=false
       $('#apphead').css({
        'position':'relative',
        'top':'0px',
        'max-height': 280,
       // 'transform': `translate3d(0,${height},0)`
       })
       $(document).scrollTop(0)   
       $('.tout').css({
         'margin-top':'270px'
       })
    }
    else{
      $('.tout').css({
        'margin-top':'15px'
      })
         $(".navbar ").css({
        "display":"none"
    })
    $(document).scrollTop($(document).scrollTop()-1)
    this.men=true
   
    }
    
}
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
