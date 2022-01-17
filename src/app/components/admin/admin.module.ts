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
import { productReducer } from '../../services/state/product.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from '../../services/state/product.effects';
import { AdminHomeComponent } from './admin-home/admin-home.component';
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
  declarations: [CreateItemComponent, UpdateItemComponent, AdminCardsComponent, AdminHomeComponent],
  providers: [],
})
export class AdminModule {}
