import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { CreateCompService } from '../create-comp.service';

@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.css']
})
export class JoueurComponent implements OnInit {
  @Input('_id') _id;
  @Output('joueur')event:EventEmitter <any> = new EventEmitter();
  joueur = {nom:'',prenom:'',age:null,taille:null,poids:null}
  constructor() { }

  ngOnInit() {
  }

}
