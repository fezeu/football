import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from  '@angular/forms';

import { ClientRoutingModule } from './client-routing.module';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CompteService } from './compte.service';


@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule
  ],
  declarations: [ConnexionComponent, InscriptionComponent],
  providers:[CompteService]
})
export class ClientModule { }
