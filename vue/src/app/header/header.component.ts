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
  slideIndex = 0;
  constructor(
    private mes : MessageToHeadService,
    private compte: CompteService
  ) {
    
   }

  ngOnInit() {
    
  //this.showSlides();
  let mesimage =['head1.jpg','head2.jpg','head3.jpg','head4.jpg'];
  let i = 0
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
  $(document).on('scroll',function(){
   let opacite = 1- $(document).scrollTop()/220;
   let height = 480- $(document).scrollTop()
   if(opacite<0)opacite=0;
   if(height<280){
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

    $('#content').css({ 
      'opacity': opacite,
      
    })
    
});


  }
  ngOnChanges(changes: SimpleChanges){
    for (let elm in changes.style.currentValue){
      $('.monHead').css(elm['proprite'],elm['valeur'] )
    }
    
  }
  bye(){
    this.compte.logout()
  }
  showSlides() {
    var i;
    
    
    for (i = 0; i < $(".mySlides").length; i++) {
      $(".mySlides")[i].style.display = "none";  
    }
    this.slideIndex++;
    if (this.slideIndex> $(".mySlides").length) {this.slideIndex = 1}    
    
    $(".mySlides")[this.slideIndex-1].style.display = "block";  
   
    setTimeout(this.showSlides, 2000); // Change image every 2 seconds
  }
}
