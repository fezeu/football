import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animation';
import { MessageToHeadService } from './message-to-head.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideInAnimation]
})
export class AppComponent {
  affiche: boolean = false;
  style = {};
  constructor(
    private mes : MessageToHeadService
  ){
    this.mes.message.subscribe((e)=>{
      if(e['object']){
        if(e['object']=='suphead'){
          this.affiche = false;

        }
        if(e['object']=='affiche'){
          this.affiche = true;
        }
        if(e['object']=='style'){
          if(e['de']=='app'){
            for(let elm in e['style']){
              $(document).css(elm['propriete'],elm['valeur'])
            }
          } 
          if(e['de']=='head'){
            this.style = e['style'] 
          }        
        }
      }
    })
  }
  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
