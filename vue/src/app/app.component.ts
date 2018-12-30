import { Component , OnInit} from '@angular/core';
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
export class AppComponent implements OnInit{
  affiche: boolean = true;
  style = {};
  manage;
  script;
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
        if(e['object']=='manage'){
          this.manage = e['value']
        }
        if(e['object']=='script'){
          if(e['de']=='head'){
            this.script = e['script']
          }
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
    
    this.compt.get_default().subscribe((e)=>{
      if(e){
        sessionStorage.setItem('default',JSON.stringify({tournois:[e[0].id]}));
      }
    })
  }
  ngOnInit(){
    
  }
  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
