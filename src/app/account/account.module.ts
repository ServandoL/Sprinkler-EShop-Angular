import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { userRoutes } from './account.routes';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account.component';
import { LogoutComponent } from './logout/logout.component';

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
    LoginComponent
  ],
  providers: [],
})
export class AccountModule { }
