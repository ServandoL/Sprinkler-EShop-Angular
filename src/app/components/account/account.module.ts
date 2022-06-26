import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { userRoutes } from './account.routes';
import { LoginComponent } from '../home/login/login.component';
import { AccountComponent } from './account.component';
import { LogoutComponent } from '../home/logout/logout.component';
import { SignUpComponent } from '../home/sign-up/sign-up.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { SharedAppModule } from '../shared/shared.module';
import { CartComponent } from './cart/cart.component';
import { ProductsModule } from '../products/products.module';
import { CheckoutComponent } from './cart/checkout/checkout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    FormsModule,
    ReactiveFormsModule,
    ProductsModule,
    SharedAppModule,
  ],
  exports: [],
  declarations: [
    AccountComponent,
    LogoutComponent,
    LoginComponent,
    SignUpComponent,
    UpdateProfileComponent,
    OrderHistoryComponent,
    DeleteAccountComponent,
    CartComponent,
    CheckoutComponent,
  ],
  providers: [],
})
export class AccountModule {}
