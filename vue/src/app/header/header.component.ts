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
  var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}    
    
    slides[slideIndex-1].style.display = "block";  
   
    setTimeout(showSlides, 2000); // Change image every 2 seconds
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
