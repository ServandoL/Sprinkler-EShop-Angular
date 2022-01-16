import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';

export const adminRoutes: Routes = [
  { path: 'profile', component: AdminComponent },
  { path: 'create-item', component: CreateItemComponent },
  { path: 'update-item', component: UpdateItemComponent },
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
]

