import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetitionRoutingModule } from './competition-routing.module';
import { MainComponent } from './main/main.component';
import { InitComponent } from './init/init.component';
import { EquipesComponent } from './equipes/equipes.component';
import { ArbitreComponent } from './arbitre/arbitre.component';
import { TerrainComponent } from './terrain/terrain.component';
import { JoueurComponent } from './joueur/joueur.component';

@NgModule({
  imports: [
    CommonModule,
    CompetitionRoutingModule
  ],
  declarations: [MainComponent, InitComponent, EquipesComponent, ArbitreComponent, TerrainComponent, JoueurComponent]
})
export class CompetitionModule { }
