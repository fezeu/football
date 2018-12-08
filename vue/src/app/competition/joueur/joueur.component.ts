import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { CreateCompService } from '../create-comp.service';


@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.css']
})
export class JoueurComponent implements OnInit {
  @Input('_id') _id;
  @Input('equipe') equipe;
  @Output('nom')event:EventEmitter <String> = new EventEmitter();
  joueur = {id:'',_id:'',equipe:'', nom:'',prenom:'',age:null,taille:null,poids:null}
  constructor(
    private comp : CreateCompService
  ) { }

  ngOnInit() {
  }
  add(){
    this.joueur.id = this._id;
    this.joueur.equipe = this.equipe;
    this.comp.set_joueur(this.joueur).subscribe((e)=>{
      if(e['status']){
        this.event.emit(this.joueur.nom);
        
        this.joueur = {id:'',_id:'',equipe:'', nom:'',prenom:'',age:null,taille:null,poids:null};
       return console.log("joueur ajouter a l'equipe")
      }
      alert("une erreur c'est produite "+ JSON.parse(e['message']))
    })
  }

}
