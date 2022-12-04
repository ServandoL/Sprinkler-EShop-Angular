import { createAction, props } from '@ngrx/store';
import { AppState } from '../state';

const HydrateAction = '[Hydration] Hydrate';
const HydrateActionSuccess = '[Hydration] Hydrate Success';
const HydrateActionFailure = '[Hydration] Hydrate Failure';

export const hydrate = createAction(HydrateAction);
export const hydrateSuccess = createAction(HydrateActionSuccess, props<{ state: AppState }>());
export const hydrateFailure = createAction(HydrateActionFailure);
