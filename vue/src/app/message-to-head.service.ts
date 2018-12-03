import { Injectable, EventEmitter } from '@angular/core';


export class MessageToHeadService {
  message: EventEmitter<any> = new EventEmitter()
  constructor() { }
}
