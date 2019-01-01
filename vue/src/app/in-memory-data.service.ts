import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { InMemoryDbService,RequestInfo } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  
  createDb(reqInfo?: RequestInfo) {

    const poul:any = [{id:0,poul:null}]
    const matchs = [{id:null,matchs:null}];
    const equipes = [{id:null,equipe:null}];
    const matchEquipes = [{id:null,matchEquipes:null}];
 

    // default returnType
    let returnType  = 'object';
    // let returnType  = 'observable';
    // let returnType  = 'promise';

    // demonstrate POST commands/resetDb
    // this example clears the collections if the request body tells it to do so
    if (reqInfo) {
      const body = reqInfo.utils.getJsonBody(reqInfo.req) || {};
      if (body.clear === true) {
        poul.length=0;
        matchEquipes.length = 0;
        equipes.length= 0;
        matchs.length=0;
        status = null;
      }

      // 'returnType` can be 'object' | 'observable' | 'promise'
      returnType = body.returnType || 'object';
    }
    const db = { poul, matchEquipes, equipes, matchs, status };

    switch (returnType) {
      case ('observable'):
        return of(db);
      case ('promise'):
        return new Promise(resolve => {
          resolve(db);
        });
      default:
        return db;
    }
  }
}
