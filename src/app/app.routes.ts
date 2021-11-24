import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { PathNotFoundComponent } from "./components/path-not-found/path-not-found.component";
import { ProductsComponent } from "./components/products/products.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'account',
    loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: PathNotFoundComponent },

]
