import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhasePouleComponent } from './phase-poule/phase-poule.component';
import { QuartComponent } from './quart/quart.component';
import { DemiComponent } from './demi/demi.component';
import { FinaleComponent } from './finale/finale.component';
import { MainComponent } from './main/main.component';
const routes: Routes = [
  {path:'resultat',component:MainComponent,
  children:[
    {path:'phase_poule',component:PhasePouleComponent},
    {path:'quart',component:QuartComponent},
    {path:'demi_finale',component:DemiComponent},
    {path:'finale',component:FinaleComponent},
    {path:'', component:PhasePouleComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultatRoutingModule { }
