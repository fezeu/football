import { Component, OnInit } from '@angular/core';
import { CompteService } from '../compte.service';
import { Router } from '@angular/router';
import { MessageToHeadService } from 'src/app/message-to-head.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  user ={nom:'',password:''}
  constructor(
    private compte : CompteService,
    private route: Router,
    private mes: MessageToHeadService
  ) {
    this.mes.message.emit({
      object:'script',
      de:'head',
      script:(function(){
        $(document).ready(function(){
          $(".active").removeClass('active');
          $('#admin').addClass('active');
        })
        
      })()
    })
   }

  ngOnInit() {
    $(document).on('scroll',function(){
      let height = $('.tete').outerHeight();
      if(height<=90){

        $('.topajuste').css({
          'margin-top':290
        });
      }else{
 
        $('.topajuste').css({
          'margin-top':30
        });
      }
    })
  }
  connect(){
    this.compte.login(this.user).subscribe((e)=>{
      if(e['status']){
        sessionStorage.removeItem('Tstatus');
        sessionStorage.setItem('user',JSON.stringify( e['user']));
        alert('Bienvenue '+e['user'].nom);
        this.mes.message.emit({object:'manage',value:true})
        this.route.navigate(['/competition']);
      }else{
        if(e['message']=='AuthError'){
          alert("nom d'utilisateur ou mot de passe incorrect")
        }
      }
    })
  }
}
