import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productsRoutes } from './product.routes';
import { ProductComponent } from './product/product.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedAppModule } from '../shared/shared.module';
import { QtyFormComponent } from './components/qty-form/qty-form.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductEffects } from '../../services/state/product/product.effects';
import { productReducer } from '../../services/state/product/product.reducers';
import { ProductService } from '../../services/state/product/product.service';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { StarRatingModule } from '../../../../projects/star-rating/src/public-api';
import { DescriptionComponent } from './components/description/description.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productsRoutes),
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    FormsModule,
    ReactiveFormsModule,
    SharedAppModule,
    StarRatingModule.forRoot(),
  ],
  exports: [QtyFormComponent, FilterComponent],
  declarations: [
    ProductComponent,
    QtyFormComponent,
    ProductCardComponent,
    ReviewsComponent,
    DescriptionComponent,
    FilterComponent,
  ],
  providers: [ProductService],
})
export class ProductsModule {}
