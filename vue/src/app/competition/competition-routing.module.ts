import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PhasePouleComponent } from './phase-poule/phase-poule.component';
import { QuartComponent } from './quart/quart.component';
import { DemiComponent } from './demi/demi.component';
import { FinaleComponent } from './finale/finale.component';

const routes: Routes = [
  {path: 'competition',component:  MainComponent, data: { animation: 'competition' },
  children:[
    {path:'phase_poule',component:PhasePouleComponent},
    {path:'quart',component: QuartComponent},
    {path:'demi',component: DemiComponent},
    {path:'finale',component: FinaleComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetitionRoutingModule { }
