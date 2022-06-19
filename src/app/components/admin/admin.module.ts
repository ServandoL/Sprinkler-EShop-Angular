import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { adminRoutes } from './admin.routes';
import { CreateItemComponent } from './create-item/create-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { AdminCardsComponent } from './admin-cards/admin-cards.component';
import { SharedAppModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ProductEffects } from '../../services/state/product/product.effects';
import { productReducer } from '../../services/state/product/product.reducers';
import { FilterService } from '../../services/state/product-filters/filter.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    FormsModule,
    ReactiveFormsModule,
    SharedAppModule,
  ],
  exports: [],
  declarations: [
    CreateItemComponent,
    UpdateItemComponent,
    AdminCardsComponent,
    AdminHomeComponent,
  ],
  providers: [FilterService],
})
export class AdminModule {}
