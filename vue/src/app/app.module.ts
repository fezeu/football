import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from  '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientModule } from './client/client.module';
import { CompetitionModule } from './competition/competition.module';
import { ClassementModule } from './classement/classement.module';
import { ProgrammeModule } from './programme/programme.module';
import { MessageToHeadService } from './message-to-head.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AcceuilComponent,
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ProgrammeModule,
    ClassementModule,
    CompetitionModule,
    ClientModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MessageToHeadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
