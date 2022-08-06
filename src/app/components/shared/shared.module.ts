import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedFooterComponent } from './shared-footer/shared-footer.component';
import { SharedHeaderComponent } from './shared-header/shared-header.component';
import { SharedLoaderComponent } from './shared-loader/shared-loader.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports: [HttpClientModule, CommonModule, RouterModule],
  exports: [
    SharedHeaderComponent,
    SharedFooterComponent,
    SharedLoaderComponent,
    PaginationComponent,
  ],
  declarations: [
    SharedHeaderComponent,
    SharedFooterComponent,
    SharedLoaderComponent,
    PaginationComponent,
  ],
  providers: [],
})
export class SharedAppModule {}
