import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { MoneyExampleBasicComponent } from './money-example-basic/money-example-basic.component'

const routes: Routes = [
   { path: 'home',               component: HomeComponent },
   { path: 'moneyExampleBasic',  component: MoneyExampleBasicComponent },

   { path: '',   redirectTo: 'home', pathMatch: 'full' },
   { path: '**', redirectTo: 'home', pathMatch: 'full'  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
