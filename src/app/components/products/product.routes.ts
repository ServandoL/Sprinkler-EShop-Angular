import { Routes } from '@angular/router';
import { DescriptionComponent } from './components/description/description.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ProductComponent } from './product/product.component';

export const productsRoutes: Routes = [
  { path: 'product/:name', component: ProductComponent },
  { path: 'description', component: DescriptionComponent },
  { path: 'review', component: ReviewsComponent },
];
