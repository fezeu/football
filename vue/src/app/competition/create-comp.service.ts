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
}
