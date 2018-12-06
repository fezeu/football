import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { CreateCompService } from '../create-comp.service';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.css']
})
export class TerrainComponent implements OnInit {
  @Input('_id') _id;
  @Output('terrain')event:EventEmitter <any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
