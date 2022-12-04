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
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { SharedAppModule } from './components/shared/shared.module';
import { UserEffects } from './services/state/users/users.effects';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { CartEffects } from './services/state/cart/cart.effects';
import { hydrationMetaReducer } from './services/state/global/hydration.reducer';
import { HydrationEffects } from './services/state/global/hydration.effect';
import { CheckoutEffects } from './services/state/checkout/checkout.effects';
import { OrderHistoryEffects } from './services/state/orderHistory/orderHistory.effects';
import { FilterEffects } from './services/state/product-filters/filter.effect';
import { ProductAppService } from './services/state/services/product.service';
import { CartAppService } from './services/state/services/cart.service';
import { CheckoutAppService } from './services/state/services/checkout.service';
import { AuthService } from './services/auth/auth-service.service';
import { reducers } from './services/state/state';

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

@NgModule({
  declarations: [AppComponent, PathNotFoundComponent, AdminComponent, UnauthorizedComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      UserEffects,
      CartEffects,
      HydrationEffects,
      CheckoutEffects,
      OrderHistoryEffects,
      FilterEffects,
    ]),
    StoreDevtoolsModule.instrument({
      name: 'Sprinkler EShop DevTools',
      maxAge: 25,
      logOnly: environment.production,
    }),
    GraphQLModule,
    SharedAppModule,
  ],
  providers: [AuthService, ProductAppService, CartAppService, CheckoutAppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
