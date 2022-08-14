import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

export const userRoutes: Routes = [
  { path: 'profile', component: AccountComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cart/checkout', component: CheckoutComponent },
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
