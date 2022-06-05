import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { GraphQLModule } from './services/apollo/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { SharedAppModule } from './components/shared/shared.module';
import { userReducer } from './services/state/users/users.reducers';
import { AuthService } from './utils/auth/auth-service.service';
import { UserEffects } from './services/state/users/users.effects';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { cartReducer } from './services/state/cart/cart.reducers';
import { CartEffects } from './services/state/cart/cart.effects';
import { hydrationMetaReducer } from './services/state/global/hydration.reducer';
import { HydrationEffects } from './services/state/global/hydration.effect';
import { CheckoutEffects } from './services/state/checkout/checkout.effects';
import { checkoutReducer } from './services/state/checkout/checkout.reducers';
import { orderHistoryReducer } from './services/state/orderHistory/orderHistory.reducers';
import { OrderHistoryEffects } from './services/state/orderHistory/orderHistory.effects';

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    PathNotFoundComponent,
    AdminComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    StoreModule.forRoot(
      {
        users: userReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        orderHistory: orderHistoryReducer,
      },
      { metaReducers }
    ),
    EffectsModule.forRoot([
      UserEffects,
      CartEffects,
      HydrationEffects,
      CheckoutEffects,
      OrderHistoryEffects,
    ]),
    StoreDevtoolsModule.instrument({
      name: 'Sprinkler EShop DevTools',
      maxAge: 25,
      logOnly: environment.production,
    }),
    GraphQLModule,
    SharedAppModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
