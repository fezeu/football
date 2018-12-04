import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultatRoutingModule } from './resultat-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    ResultatRoutingModule
  ],
  declarations: [MainComponent]
})
export class ResultatModule { }
