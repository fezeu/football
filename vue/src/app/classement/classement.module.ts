import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassementRoutingModule } from './classement-routing.module';
import { MainComponent } from './main/main.component';
import { PouleComponent } from './poule/poule.component';
import { EquipeComponent } from './equipe/equipe.component';
import { JoueurComponent } from './joueur/joueur.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    ClassementRoutingModule
  ],
  declarations: [MainComponent, PouleComponent, EquipeComponent, JoueurComponent, MenuComponent]
})
export class ClassementModule { }
