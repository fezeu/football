import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultatRoutingModule } from './resultat-routing.module';
import { MainComponent } from './main/main.component';
import { MatchComponent } from './match/match.component';
import { MenuComponent } from './menu/menu.component';
import { PhasePouleComponent } from './phase-poule/phase-poule.component';
import { QuartComponent } from './quart/quart.component';
import { DemiComponent } from './demi/demi.component';
import { FinaleComponent } from './finale/finale.component';

@NgModule({
  imports: [
    CommonModule,
    ResultatRoutingModule
  ],
  declarations: [MainComponent,MatchComponent, MenuComponent, PhasePouleComponent, QuartComponent, DemiComponent, FinaleComponent]
})
export class ResultatModule { }
