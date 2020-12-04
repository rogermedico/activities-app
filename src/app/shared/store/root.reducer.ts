import { AppStore } from '@store/root.state';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { activityReducer } from './activity/activity.reducer';
import { authReducer } from './auth/auth.reducer';
import { userReducer } from './user/user.reducer';

export const reducers: ActionReducerMap<AppStore> = {
  authState: authReducer,
  userState: userReducer,
  activityState: activityReducer,
  routerReducer: fromRouter.routerReducer,
};
