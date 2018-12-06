import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultatRoutingModule } from './resultat-routing.module';
import { MainComponent } from './main/main.component';
import { MatchComponent } from './match/match.component';

@NgModule({
  imports: [
    CommonModule,
    ResultatRoutingModule
  ],
  declarations: [MainComponent, MatchComponent]
})
export class ResultatModule { }
