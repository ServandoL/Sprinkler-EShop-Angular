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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productsRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    ControllersComponent,
    RotorsComponent,
    SprinklerBodyComponent,
    SprinklerNozzlesComponent,
    ValvesComponent
  ],
  providers: [],
})
export class ProductsModule { }
