import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PouleComponent } from './poule/poule.component';
import { EquipeComponent } from './equipe/equipe.component';
import { JoueurComponent } from './joueur/joueur.component';

const routes: Routes = [
  {path: 'classement',
  children:[
    {path:'poules',component: PouleComponent},
    {path:'equipes',component: EquipeComponent},
    {path:'joueurs',component: JoueurComponent},
    {path:'', component:PouleComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassementRoutingModule { }
