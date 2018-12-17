import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animation';
import { MessageToHeadService } from './message-to-head.service';
import { CompteService } from './client/compte.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideInAnimation]
})
export class AppComponent {
  affiche: boolean = true;
  style = {};
  constructor(
    private mes : MessageToHeadService,
    private compt : CompteService
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
    });
    this.compt.put_default('5c16f00ea1d3fe1cb048607a').subscribe()
    this.compt.get_default().subscribe((e)=>{
      if(e){
        sessionStorage.setItem('user',JSON.stringify({tournois:[e[0].id]}));
      }
    })
  }
  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
