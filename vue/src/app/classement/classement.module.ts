import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassementRoutingModule } from './classement-routing.module';
import { MainComponent } from './main/main.component';
import { PouleComponent } from './poule/poule.component';
import { EquipeComponent } from './equipe/equipe.component';
import { JoueurComponent } from './joueur/joueur.component';

@NgModule({
  imports: [
    CommonModule,
    ClassementRoutingModule
  ],
  declarations: [MainComponent, PouleComponent, EquipeComponent, JoueurComponent]
})
export class ClassementModule { }
