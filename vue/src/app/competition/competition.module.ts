import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetitionRoutingModule } from './competition-routing.module';
import { MainComponent } from './main/main.component';
import { InitComponent } from './init/init.component';
import { EquipesComponent } from './equipes/equipes.component';

@NgModule({
  imports: [
    CommonModule,
    CompetitionRoutingModule
  ],
  declarations: [MainComponent, InitComponent, EquipesComponent]
})
export class CompetitionModule { }
