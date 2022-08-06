import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/home/login/login.component';
import { LogoutComponent } from './components/home/logout/logout.component';
import { SignUpComponent } from './components/home/sign-up/sign-up.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AdminGuard } from './utils/auth/admin.guard';
import { AuthGuard } from './utils/auth/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'account',
    loadChildren: () => import('./components/account/account.module').then((m) => m.AccountModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./components/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard],
  },

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: PathNotFoundComponent },
];
