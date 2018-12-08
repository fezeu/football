import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  matchs = [{equipes:['cameriun','russie']},{equipes:['hum','reresie']},{equipes:['hello','ruie']}]
  constructor() { }

  ngOnInit() {
  }

}
