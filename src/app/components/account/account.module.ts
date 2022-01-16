import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { userRoutes } from './account.routes';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account.component';
import { LogoutComponent } from './logout/logout.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    AccountComponent,
    LogoutComponent,
    LoginComponent,
    SignUpComponent,
    UpdateProfileComponent,
    OrderHistoryComponent,
    DeleteAccountComponent
  ],
  providers: [],
})
export class AccountModule { }
