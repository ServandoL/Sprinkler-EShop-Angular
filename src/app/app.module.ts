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
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { SharedFooterComponent } from './components/shared/shared-footer/shared-footer.component';
import { SharedHeaderComponent } from './components/shared/shared-header/shared-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SharedHeaderComponent,
    ProductsComponent,
    PathNotFoundComponent,
    AdminComponent,
    SharedFooterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    LayoutModule,
    GraphQLModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Sprinkler EShop DevTools',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
