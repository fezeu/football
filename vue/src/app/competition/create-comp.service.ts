import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subject, of } from 'rxjs';
import { map,tap,catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    
  })
};
const httpOption = {
  headers: new HttpHeaders({
    'Content-Type':  'multipart/form-data',
  })
};


@Injectable({
  providedIn: 'root'
})
export class CreateCompService {
  poule1:Subject<any> = new Subject();
  poule2:Subject<any> = new Subject();
  poule3:Subject<any> = new Subject();
  poule4:Subject<any> = new Subject();
  status:any=null;
  poul:any=null;
  matchs:any = [];
  equipes:any = [];
  matchEquipes:any = []
  statusProvide:Subject<any> = new Subject();
  poulProvide:Subject<any> = new Subject();
  matchsProvide:Subject<any> = new Subject();
  equipesProvide:Subject<any> = new Subject();
  matchEquipesProvide:Subject<any> = new Subject();
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
    this.http.get('api/status').pipe(catchError(()=>{return of([])}),tap(
      (status)=>{
        if(status){
          this.statusProvide.next(status)
        }
        this.http.get(`/tournois/status/${id}`).subscribe({
          next:(e)=>{
            if(e!=status){
              this.statusProvide.next(e)
              this.http.put('api/status',e).subscribe()
            }
    
          },
        })
      }
    )).subscribe()
    
   

  }
  get_poul(id,niv?){
    this.http.get('api/poul/0').pipe(catchError(()=>{return of([])}),tap((poul)=>{
      poul = poul['poul']
      if(poul){
        if(poul['poules']){
          let tab = poul['poules'];
          let t1 = tab.map((val)=>{if(val.niveau==1)return val});
          if(t1)this.poule1.next(t1);
          let t2 = tab.map((val)=>{if(val.niveau==2)return val});
          if(t2)this.poule2.next(t2);
          let t3 = tab.map((val)=>{if(val.niveau==3)return val});
          if(t3)this.poule3.next(t3);
          let t4 = tab.map((val)=>{if(val.niveau==4)return val});
          if(t4)this.poule4.next(t4); 
        }
      }
      
         this.http.post('/poule_all',{id:id},httpOptions).subscribe({
           next:(e)=>{
            if(e!=poul){
              let tab = e['poules'];
              let t1 = tab.map((val)=>{if(val.niveau==1)return val});
              if(t1)this.poule1.next(t1);
              let t2 = tab.map((val)=>{if(val.niveau==2)return val});
              if(t2)this.poule2.next(t2);
              let t3 = tab.map((val)=>{if(val.niveau==3)return val});
              if(t3)this.poule3.next(t3);
              let t4 = tab.map((val)=>{if(val.niveau==4)return val});
              if(t4)this.poule4.next(t4);
              this.http.put('api/poul',{id:0,poul:e}).subscribe()
            }
  
        }
         })
    
    })).subscribe()
    
  }
  get_match_poule(id){
    this.http.get(`api/matchs/${id}`).pipe(catchError(()=>{return of({})}),tap(
      (match)=>{
        if(match){
          this.matchsProvide.next(match)
        }
    
        this.http.get(`/match_poule/${id}`).pipe(catchError(()=>{return of(match['match'])})).subscribe({
          next:(e)=>{
            if(match){
              if(e!=match['match']){
                this.matchsProvide.next({id:id,match:e});
                this.http.post('api/matchs',{id:id+'',match:e}).subscribe()
  
              }
            }else{
              this.matchsProvide.next({id:id,match:e})
              this.http.post('api/matchs',{id:id+'',match:e}).subscribe()
            }
          }
        })
      }
    )).subscribe()
    
  }
  get_equipe(id){
    this.http.get(`api/equipes/${id}`).pipe(tap(
      (equipe)=>{
        if(this.equipes){
            this.equipesProvide.next(equipe)
          }
        
     
        this.http.get(`/equipe/${id}`).pipe(catchError(()=>{return of(equipe['equipe'])})).subscribe({
          next:(e)=>{
            if(equipe){
              if(equipe['equipe']!=e){
                this.equipesProvide.next({id:id,equipe:e});
                
              }
            }else{
              this.equipesProvide.next({id:id,equipe:e});
              this.http.post('api/equipes',{id:id+'',equipe:e}).subscribe()
            }
    
          }
        });
      }
    )).subscribe()
    
   
  }
  get_equipes_match(id){
    id = id+'';
    this.http.get(`api/matchEquipes/${id}`).pipe(catchError(()=>{return of({})}),tap(
      (matchEquipe)=>{
        if(matchEquipe){
          if(matchEquipe[id]){
            this.matchEquipesProvide.next(matchEquipe)
          }
        }
     
        this.http.get(`/match_equipes/${id}`).pipe(catchError(()=>{return of(matchEquipe['matchEquipe'])})).subscribe(
          (e)=>{
            if(matchEquipe){
              if(matchEquipe['matchEquipe']!=e){
                this.matchEquipesProvide.next({id:id,matchEquipes:e});
                this.http.post('api/matchEquipes',{id,matchEquipe:matchEquipe}).subscribe()
                
              }
            }else{
              this.matchEquipesProvide.next({id:id,matchEquipes:e});
              this.http.post('api/matchEquipes',{id,matchEquipe:matchEquipe}).subscribe()
            }
    
          }
        );
       
    
      }
    )).subscribe()
    
    
  }
  update_match(match,id){
    
    return this.http.put(`/match/${id}`,match,httpOptions)
  }
  init_quart(id){
    
    return this.http.get(`/poule/quart/${id}`)
  }
  init_demi(id){
    return this.http.get(`/poule/demi/${id}`)
  }
  init_finale(id){

    return this.http.get(`/poule/finale/${id}`)
  }
  send_photo_e(photo){
    return this.http.post('/photoequipe',photo,httpOption)
  }
  notconnect(){
    alert('veillez verifier votre connexion internet');
  }
}
