import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from  '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientModule } from './client/client.module';
import { CompetitionModule } from './competition/competition.module';
import { ClassementModule } from './classement/classement.module';
import { MessageToHeadService } from './message-to-head.service';
import { FooterComponent } from './footer/footer.component';
import { ResultatModule } from './resultat/resultat.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClassementModule,
    CompetitionModule,
    ClientModule,
    ResultatModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [MessageToHeadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
