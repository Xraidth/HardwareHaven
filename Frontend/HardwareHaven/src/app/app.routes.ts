
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component.js';
import { ProductListComponent } from './pages/product-list/product-list.component.js';
import { CompraComponent } from './pages/compra/compra/compra.component.js';
import { PerfilComponent } from './pages/perfil/perfil/perfil.component.js';
import {EnvioComponent} from './pages/envio/envio/envio.component.js';
import {InventarioComponent} from './pages/inventario/inventario/inventario.component.js';
import { UsuarioComponent } from './features/inventario/usuario/usuario.component.js';
import { AyudaComponent } from './pages/ayuda/ayuda.component.js';
import { authGuard } from './guards/auth.guard.js';
import { NoAccessComponentComponent } from './pages/no-access-component/no-access-component.component.js';


export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'productList', component: ProductListComponent, canActivate: [authGuard]},
  { path: 'compra', component: CompraComponent, canActivate: [authGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [authGuard]},
  { path: 'envio', component: EnvioComponent, canActivate: [authGuard]},
  { path: 'inventario', component: InventarioComponent, canActivate: [authGuard]},
  { path: 'inventario/usuario', component: UsuarioComponent, canActivate: [authGuard]},
  { path: 'ayuda', component: AyudaComponent},{
    path: 'no-access', component: NoAccessComponentComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }

  ];

