import { Routes } from '@angular/router';
import { AuthGuard } from '../../utils/auth/auth.guard';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';

export const adminRoutes: Routes = [
  {
    path: 'dashboard',
    component: AdminHomeComponent,
  },
  { path: 'create-item', component: CreateItemComponent },
  { path: 'update-item', component: UpdateItemComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
];
