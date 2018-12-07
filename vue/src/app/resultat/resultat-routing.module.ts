import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PouleComponent } from '../classement/poule/poule.component';
import { QuartComponent } from './quart/quart.component';
import { DemiComponent } from './demi/demi.component';
import { FinaleComponent } from './finale/finale.component';
import { MainComponent } from './main/main.component';
const routes: Routes = [
  {path:'resultat',component:MainComponent,
  children:[
    {path:'phase_poule',component:PouleComponent},
    {path:'quart',component:QuartComponent},
    {path:'demi_finale',component:DemiComponent},
    {path:'finale',component:FinaleComponent},
    {path:'', component:PouleComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultatRoutingModule { }
