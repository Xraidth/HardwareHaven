
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component.js';
import { ProductListComponent } from './pages/product-list/product-list.component.js';
import { CompraComponent } from './pages/compra/compra/compra.component.js';
import { PerfilComponent } from './pages/perfil/perfil/perfil.component.js';
import {EnvioComponent} from './pages/envio/envio/envio.component.js';
import {InventarioComponent} from './pages/inventario/inventario/inventario.component.js';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'productList', component: ProductListComponent },
  { path: 'compra', component: CompraComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'envio', component: EnvioComponent},
  { path: 'inventario', component: InventarioComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' } 
  
  
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }