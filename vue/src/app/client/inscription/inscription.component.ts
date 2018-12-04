import { Component, OnInit } from '@angular/core';
import { CompteService } from '../compte.service';
import { Router } from '@angular/router';
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
    private route: Router
  ) { }

  ngOnInit() {
  }
  add(){
    this.register = "Submit..."
    this.compte.create(this.user).subscribe((e)=>{
      if(e['status']){
        alert('compte creer');
        this.compte.login({nom:this.user.nom,password:this.user.password}).subscribe((rep)=>{
          if(rep['status']){
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
