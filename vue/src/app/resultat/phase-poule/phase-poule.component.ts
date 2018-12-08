import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phase-poule',
  templateUrl: './phase-poule.component.html',
  styleUrls: ['./phase-poule.component.css']
})
export class PhasePouleComponent implements OnInit {

  matchs = [{equipes:['cameriun','russie']},{equipes:['hum','reresie']},{equipes:['hello','ruie']}]
  constructor() { }

  ngOnInit() {
  }

}
 