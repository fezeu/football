import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PhasePouleComponent } from './phase-poule/phase-poule.component';

const routes: Routes = [
  {path: 'competition',component:  MainComponent, data: { animation: 'competition' },
  children:[
    {path:'phase_poule',component:PhasePouleComponent}
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetitionRoutingModule { }
