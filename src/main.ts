import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './app/services/state/global/hydration.reducer';

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
