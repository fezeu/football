import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private http:  HttpClient,
    private route: Router
  ) { }
  login(user:{nom:String,password: String}){
    return this.http.post('/login',user,httpOptions)
  }
  logout(){
    this.http.get('/logout').subscribe((e)=>{
      if(e['status']){
        alert('Bye' + JSON.parse( sessionStorage.getItem('user')) ['name'])
        sessionStorage.removeItem('user');
        this.route.navigate(['/acceuil'])
      }
    })
  }
  create(user:{nom:String,password: String,email:String}){
    return this.http.post('/user',user,httpOptions)
  }
  get_default(){
    return this.http.get('/default')
  }
  put_default(id){
    return this.http.put('/default',{id:id},httpOptions)
  }
}
