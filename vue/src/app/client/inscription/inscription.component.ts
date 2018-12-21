import { Component, OnInit } from '@angular/core';
import { CompteService } from '../compte.service';
import { Router } from '@angular/router';
import { MessageToHeadService } from 'src/app/message-to-head.service';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  user = {nom:'',password:'',email:''};
  register = 'Register';
  constructor(
    private compte: CompteService,
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
  add(){
    this.register = "Submit..."
    this.compte.create(this.user).subscribe((e)=>{
      if(e['status']){
        alert('compte creer');
        this.compte.login({nom:this.user.nom,password:this.user.password}).subscribe((rep)=>{
          if(rep['status']){
            sessionStorage.setItem('user',JSON.stringify( rep['user']));
            this.mes.message.emit({object:'manage',value:true})
            this.route.navigate(['/competition'])
          }else{

          }
        })
      }else{
        if(e['message']=='CompteTaked'){
          alert('ce compte existe deja')
        }
        this.register = 'Register'
      }
    })
  }
}
