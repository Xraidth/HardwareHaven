
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component.js';
import { ProductListComponent } from './pages/product-list/product-list.component.js';
import { PurchaseComponent } from './pages/compra/compra/compra.component.js';
import { ProfileComponent } from './pages/perfil/perfil/perfil.component.js';
import {SendComponent } from './pages/envio/envio/envio.component.js';
import {InventoryComponent} from './pages/inventario/inventario/inventario.component.js';
import { UserComponent } from './features/inventory/user/user.component.js';
import { HelpComponent } from './pages/ayuda/ayuda.component.js';
import { authGuard } from './guards/auth.guard.js';
import { NoAccessComponentComponent } from './pages/no-access-component/no-access-component.component.js';
import { CancelPurchaseComponent } from './pages/cancel-purchase/cancel-purchase.component.js';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component.js';


export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'productList', component: ProductListComponent, canActivate: [authGuard]},
  { path: 'purchase', component: PurchaseComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  { path: 'delivery', component: SendComponent , canActivate: [authGuard]},
  { path: 'inventory', component: InventoryComponent, canActivate: [authGuard]},
  { path: 'cancelPurchases', component: CancelPurchaseComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'help', component: HelpComponent},{
    path: 'no-access', component: NoAccessComponentComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }

  ];

