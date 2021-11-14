import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PathNotFoundComponent } from "./path-not-found/path-not-found.component";
import { ProductsComponent } from "./products/products.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: PathNotFoundComponent },

]
