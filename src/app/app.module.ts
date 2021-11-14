import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedHeaderComponent } from './shared/shared-header/shared-header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ProductsComponent } from './products/products.component';
import { PathNotFoundComponent } from './path-not-found/path-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { AuthService } from './services/auth.service';
import { SharedFooterComponent } from './shared/shared-footer/shared-footer.component';

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
    LayoutModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
