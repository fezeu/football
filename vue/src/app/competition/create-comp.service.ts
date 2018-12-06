import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    
  })
};

@Injectable({
  providedIn: 'root'
})
export class CreateCompService {

  constructor(
    private http: HttpClient
  ) { }
  initialisation(basique_info:{id, nom,situation,reglement:any}){
    return this.http.post('/basique_info',basique_info,httpOptions)
  }
  set_arbitre(arbitre){
    return this.http.post('/arbitre',arbitre,httpOptions)
  }
  set_joueur(joueur){
    return this.http.post('/joueur',joueur,httpOptions)
  }
  set_equipe(equipe){
    return this.http.post('/equipe',equipe,httpOptions)
  }
  set_terrain(terrain){
    return this.http.post('/terrain',terrain,httpOptions)
  }
}
