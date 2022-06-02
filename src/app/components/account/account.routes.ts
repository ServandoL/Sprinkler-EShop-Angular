import { Routes } from '@angular/router';
import { AuthGuard } from '../../utils/auth/auth.guard';
import { AccountComponent } from './account.component';
import { CartComponent } from './cart/cart.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

export const userRoutes: Routes = [
  { path: 'profile', component: AccountComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent,
  },
  {
    path: 'delete-account',
    component: DeleteAccountComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
];
