import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgrammeRoutingModule } from './programme-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    ProgrammeRoutingModule
  ],
  declarations: [MainComponent]
})
export class ProgrammeModule { }
