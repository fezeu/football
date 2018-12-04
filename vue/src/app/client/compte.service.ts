import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    
  })
};

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(
    private http:  HttpClient
  ) { }
  login(user:{nom:String,password: String}){
    return this.http.post('/login',user,httpOptions)
  }
  create(user:{nom:String,password: String,email:String}){
    return this.http.post('/user',user,httpOptions)
  }
}
