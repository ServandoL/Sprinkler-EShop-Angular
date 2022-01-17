import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productsRoutes } from './product.routes';
import { ControllersComponent } from './controllers/controllers.component';
import { RotorsComponent } from './rotors/rotors.component';
import { SprinklerBodyComponent } from './sprinkler-body/sprinkler-body.component';
import { SprinklerNozzlesComponent } from './sprinkler-nozzles/sprinkler-nozzles.component';
import { ValvesComponent } from './valves/valves.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './state/product.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effects';
import { ProductService } from './state/product.service';
import { SharedAppModule } from '../shared/shared.module';
import { QtyFormComponent } from './components/qty-form/qty-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productsRoutes),
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    FormsModule,
    ReactiveFormsModule,
    SharedAppModule
  ],
  exports: [],
  declarations: [
    ControllersComponent,
    RotorsComponent,
    SprinklerBodyComponent,
    SprinklerNozzlesComponent,
    ValvesComponent,
    QtyFormComponent
  ],
  providers: [ProductService],
})
export class ProductsModule { }
