import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { map,tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    
  })
};

@Injectable({
  providedIn: 'root'
})
export class CreateCompService {
  poule1:Subject<any> = new Subject();
  poule2:Subject<any> = new Subject();
  poule3:Subject<any> = new Subject();
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
  get_status(id){
    return this.http.get(`/tournois/status/${id}`)
  }
  get_poul(id,niv?){
    if(niv){
    return this.http.post('/poule_all',{id:id},httpOptions).pipe(map((e)=>{
      let tab = e['poules'];
      let tniv = tab.map((val)=>{if(val.niveau==niv)return val})
      if(niv==1){
        this.poule1.next(tniv)
      }
      if(niv==2){
        this.poule2.next(tniv)
      }
      if(niv==3){
        this.poule3.next(tniv)
      }
      return tniv
    }))
  }else{
    return this.http.post('/poule_all',{id:id},httpOptions).pipe(tap((e)=>{
      let tab = e['poules'];
      let t1 = tab.map((val)=>{if(val.niveau==1)return val});
      if(t1)this.poule1.next(t1);
      let t2 = tab.map((val)=>{if(val.niveau==2)return val});
      if(t2)this.poule2.next(t2);
      let t3 = tab.map((val)=>{if(val.niveau==3)return val});
      if(t3)this.poule3.next(t3);
    }))
  }
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
  update_match(match,id){
    
    return this.http.put(`/match/${id}`,match,httpOptions)
  }
}
