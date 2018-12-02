import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetitionRoutingModule } from './competition-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    CompetitionRoutingModule
  ],
  declarations: [MainComponent]
})
export class CompetitionModule { }
