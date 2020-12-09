import { ActivityState } from './activity.state';
import * as ActivityActions from './activity.action';
import { Action, createReducer, on } from '@ngrx/store';

/* the auth state starts with no one logged in */
const defaultActivityState: ActivityState = {
  activities: null,
  activityToShow: null,
  loading: false,
  loaded: true,
  activityCreate: false,
  activityEdit: false,
  activityDelete: false,
  error: null
};

const _activityReducer = createReducer(defaultActivityState,

  /* load */
  on(ActivityActions.ActivitiesLoad, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      activityCreate: false,
      activityEdit: false,
      activityDelete: false,
      error: null
    }
  }),

  /* load success */
  on(ActivityActions.ActivitiesLoadSuccess, (state, { activities }) => {
    return {
      ...state,
      activities: activities,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* load error */
  on(ActivityActions.ActivitiesLoadError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),

  /* create activity */
  on(ActivityActions.ActivityCreate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      activityCreate: false,
      activityEdit: false,
      activityDelete: false,
      error: null
    }
  }),

  /* create activity success */
  on(ActivityActions.ActivityCreateSuccess, (state, { activity }) => {
    return {
      ...state,
      activities: [...state.activities, activity],
      loading: false,
      loaded: true,
      activityCreate: true,
      activityEdit: false,
      activityDelete: false,
      error: null
    }
  }),

  /* create activity error */
  on(ActivityActions.ActivityCreateError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),

  /* update activity */
  on(ActivityActions.ActivityUpdate, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      activityCreate: false,
      activityEdit: false,
      activityDelete: false,
      error: null
    }
  }),

  /* update activity success */
  on(ActivityActions.ActivityUpdateSuccess, (state, { activity }) => {
    return {
      ...state,
      activities: state.activities.map(a => {
        if (a.id == activity.id) return activity;
        else return a;
      }),
      loading: false,
      loaded: true,
      activityCreate: false,
      activityEdit: true,
      activityDelete: false,
      error: null
    }
  }),

  /* update activity error */
  on(ActivityActions.ActivityUpdateError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),

  /* delete activity */
  on(ActivityActions.ActivityDelete, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      activityCreate: false,
      activityEdit: false,
      activityDelete: false,
      error: null
    }
  }),

  /* delete activity success */
  on(ActivityActions.ActivityDeleteSuccess, (state, { activityId }) => {
    return {
      ...state,
      activities: state.activities.filter(a => a.id !== activityId),
      loading: false,
      loaded: true,
      activityCreate: false,
      activityEdit: false,
      activityDelete: true,
      error: null
    }
  }),

  /* delete activity error */
  on(ActivityActions.ActivityDeleteError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),

  /* select */
  on(ActivityActions.ActivitySelect, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* select success */
  on(ActivityActions.ActivitySelectSuccess, (state, { activityId }) => {
    return {
      ...state,
      activityToShow: activityId,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* select error */
  on(ActivityActions.ActivitySelectError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),

  /* deselect */
  on(ActivityActions.ActivityDeselect, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* deselect success */
  on(ActivityActions.ActivityDeselectSuccess, state => {
    return {
      ...state,
      activityToShow: null,
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* deselect error */
  on(ActivityActions.ActivityDeselectError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),

  /* signup */
  on(ActivityActions.ActivitySignup, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* signup success */
  on(ActivityActions.ActivitySignupSuccess, (state, { activity }) => {
    return {
      ...state,
      activities: state.activities.map(ac => {
        if (ac.id === activity.id) return activity;
        else return ac;
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* signup error */
  on(ActivityActions.ActivitySignupError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),

  /* signout */
  on(ActivityActions.ActivitySignout, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    }
  }),

  /* signout success */
  on(ActivityActions.ActivitySignoutSuccess, (state, { activity }) => {
    return {
      ...state,
      activities: state.activities.map(ac => {
        if (ac.id === activity.id) return activity;
        else return ac;
      }),
      loading: false,
      loaded: true,
      error: null
    }
  }),

  /* signout error */
  on(ActivityActions.ActivitySignoutError, (state, { err }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: err
    }
  }),

);

export function activityReducer(state: ActivityState | undefined, action: Action) {
  return _activityReducer(state, action);
}
