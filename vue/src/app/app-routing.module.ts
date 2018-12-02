import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import  { AcceuilComponent } from './acceuil/acceuil.component'


const routes: Routes = [
  { path: 'acceuil', component:AcceuilComponent, data: {animation : 'acceuil'} },
  { path: '',   redirectTo: '/acceuil', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
