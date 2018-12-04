import { Component, OnInit } from '@angular/core';
import { CompteService } from '../compte.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  user ={nom:'',password:''}
  constructor(
    private compte : CompteService,
    private route: Router
  ) { }

  ngOnInit() {
  }
  connect(){
    this.compte.login(this.user).subscribe((e)=>{
      if(e['status']){
        sessionStorage.setItem('user',e['user']);
        alert('Bienvenue '+e['user'].nom);
        this.route.navigate(['/competition']);
      }else{
        if(e['message']=='AuthError'){
          alert("nom d'utilisateur ou mot de passe incorrect")
        }
      }
    })
  }
}
