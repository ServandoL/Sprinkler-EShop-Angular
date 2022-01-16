import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { SharedFooterComponent } from './shared-footer/shared-footer.component';
import { SharedHeaderComponent } from './shared-header/shared-header.component';
import { SharedLoaderComponent } from './shared-loader/shared-loader.component';

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule
  ],
  exports: [
    SharedHeaderComponent,
    SharedFooterComponent,
    SharedLoaderComponent,
  ],
  declarations: [
    SharedHeaderComponent,
    SharedFooterComponent,
    SharedLoaderComponent,
  ],
  providers: [],
})
export class SharedAppModule {}