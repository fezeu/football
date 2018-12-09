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
