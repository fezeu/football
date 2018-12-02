import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassementRoutingModule } from './classement-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    ClassementRoutingModule
  ],
  declarations: [MainComponent]
})
export class ClassementModule { }
