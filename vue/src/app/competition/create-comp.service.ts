import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    
  })
};

@Injectable({
  providedIn: 'root'
})
export class CreateCompService {
  poule1:Subject<any> = new Subject()
  constructor(
    private http: HttpClient
  ) { 
    
  }
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
  create_tournois(id){
    return this.http.post('/tournois_create',{id:id},httpOptions)
  }
  get_poul(id,niv?){
    if(niv)
    return this.http.post('/poule_all',{id:id},httpOptions).pipe(map((e)=>{
      let tab = e['poules'];
      let tniv = tab.map((val)=>{if(val.niveau==niv)return val})
      if(niv==1){
        this.poule1.next(tniv)
      }
      return tniv
    }))
  }
  get_match_poule(id){
    return this.http.get(`/match_poule/${id}`)
  }
  get_equipe(id){
    return this.http.get(`/equipe/${id}`)
  }
  get_equipes_match(id){
    return this.http.get(`/match_equipes/${id}`)
  }
}
