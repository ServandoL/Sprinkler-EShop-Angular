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
import { StoreModule } from '@ngrx/store';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { SharedAppModule } from './components/shared/shared.module';
import { userReducer } from './services/state/users/users.reducers';
import { AuthService } from './utils/auth/auth-service.service';
import { productReducer } from './services/state/product.reducers';
import { filterReducer } from './services/state/product-filters/filter.reducers';
import { UserEffects } from './services/state/users/users.effects';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

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
    StoreModule.forRoot({
      users: userReducer
    }),
    EffectsModule.forRoot([UserEffects]),
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
