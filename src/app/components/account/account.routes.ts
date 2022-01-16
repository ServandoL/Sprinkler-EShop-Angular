import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

export const userRoutes: Routes = [
  { path: 'profile', component: AccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'delete-account', component: DeleteAccountComponent },
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
]

