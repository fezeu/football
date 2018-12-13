import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetitionRoutingModule } from './competition-routing.module';
import { MainComponent } from './main/main.component';
import { InitComponent } from './init/init.component';
import { EquipesComponent } from './equipes/equipes.component';
import { ArbitreComponent } from './arbitre/arbitre.component';
import { TerrainComponent } from './terrain/terrain.component';
import { JoueurComponent } from './joueur/joueur.component';
import { CreateCompService } from './create-comp.service';
import { FormsModule } from  '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { PhasePouleComponent } from './phase-poule/phase-poule.component';
import { MatchComponent } from './match/match.component';
import { QuartComponent } from './quart/quart.component';

@NgModule({
  imports: [
    CommonModule,
    CompetitionRoutingModule,
    FormsModule
  ],
  declarations: [MainComponent, InitComponent, EquipesComponent, ArbitreComponent, TerrainComponent, JoueurComponent, MenuComponent, PhasePouleComponent, MatchComponent, QuartComponent],
  providers: [CreateCompService]
})
export class CompetitionModule { }
