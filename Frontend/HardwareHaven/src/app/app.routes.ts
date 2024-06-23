
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component.js';
import { ProductListComponent } from './product-list/product-list.component.js';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'productList', component: ProductListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' } 
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }