import { Routes } from '@angular/router';
import { ControllersComponent } from './controllers/controllers.component';
import { RotorsComponent } from './rotors/rotors.component';
import { SprinklerBodyComponent } from './sprinkler-body/sprinkler-body.component';
import { SprinklerNozzlesComponent } from './sprinkler-nozzles/sprinkler-nozzles.component';
import { ValvesComponent } from './valves/valves.component';

export const productsRoutes: Routes = [
  { path: 'controllers', component: ControllersComponent },
  { path: 'rotors', component: RotorsComponent },
  { path: 'sprinkler-bodies', component: SprinklerBodyComponent },
  { path: 'sprinkler-nozzles', component: SprinklerNozzlesComponent },
  { path: 'valves', component: ValvesComponent },
]
