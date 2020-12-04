import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as ActivityActions from './activity.action';
import { ActivitiesService } from '@services/activities.service';
import { Activity } from '@models/activity.model';

@Injectable()
export class ActivityEffects {

  constructor(private actions$: Actions, private as: ActivitiesService) { }

  /* load */
  login$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityActions.ActivityActionTypes.ACTIVITIES_LOAD),
    mergeMap(() => this.as.getActivities().pipe(
      map(activities => {
        return { type: ActivityActions.ActivityActionTypes.ACTIVITIES_LOAD_SUCCESS, activities: activities }
      }),
      catchError(err => of({ type: ActivityActions.ActivityActionTypes.ACTIVITIES_LOAD_ERROR, err: err }))
    ))
  ));

  /* create activity */
  createActivity$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityActions.ActivityActionTypes.ACTIVITY_CREATE),
    mergeMap((action: { type: string, activity: Activity }) => {
      return this.as.createActivity(action.activity).pipe(
        map(activity => {
          return { type: ActivityActions.ActivityActionTypes.ACTIVITY_CREATE_SUCCESS, activity: activity }
        }),
        catchError(err => of({ type: ActivityActions.ActivityActionTypes.ACTIVITY_CREATE_ERROR, err: err }))
      )
    })
  ));

  /* update activity */
  updateActivity$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityActions.ActivityActionTypes.ACTIVITY_UPDATE),
    mergeMap((action: { type: string, activity: Activity }) => {
      return this.as.updateActivity(action.activity).pipe(
        map(() => {
          return { type: ActivityActions.ActivityActionTypes.ACTIVITY_UPDATE_SUCCESS, activity: action.activity }
        }),
        catchError(err => of({ type: ActivityActions.ActivityActionTypes.ACTIVITY_UPDATE_ERROR, err: err }))
      )
    })
  ));

  /* delete activity */
  deleteActivity$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityActions.ActivityActionTypes.ACTIVITY_DELETE),
    mergeMap((action: { type: string, activityId: number }) => {
      return this.as.deleteActivity(action.activityId).pipe(
        map(() => {
          return { type: ActivityActions.ActivityActionTypes.ACTIVITY_DELETE_SUCCESS, activityId: action.activityId }
        }),
        catchError(err => of({ type: ActivityActions.ActivityActionTypes.ACTIVITY_DELETE_ERROR, err: err }))
      )
    })
  ));

  /* select */
  select$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityActions.ActivityActionTypes.ACTIVITY_SELECT),
    map((action: { type: string, activityId: number }) => {
      return { type: ActivityActions.ActivityActionTypes.ACTIVITY_SELECT_SUCCESS, activityId: action.activityId }
    }),
    catchError(err => of({ type: ActivityActions.ActivityActionTypes.ACTIVITY_SELECT_ERROR, err: err }))
  ));

  /* deselect */
  deselect$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityActions.ActivityActionTypes.ACTIVITY_DESELECT),
    map(() => {
      return { type: ActivityActions.ActivityActionTypes.ACTIVITY_DESELECT_SUCCESS }
    }),
    catchError(err => of({ type: ActivityActions.ActivityActionTypes.ACTIVITY_DESELECT_ERROR, err: err }))
  ));

  /* signup */
  signup$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityActions.ActivityActionTypes.ACTIVITY_SIGNUP),
    mergeMap((action: { type: string, activity: Activity, userId: number }) => {
      const newActivity = { ...action.activity, participatingUsers: [...action.activity.participatingUsers, action.userId] };
      return this.as.updateActivity(newActivity).pipe(
        map(() => {
          return { type: ActivityActions.ActivityActionTypes.ACTIVITY_SIGNUP_SUCCESS, activity: newActivity }
        }),
        catchError(err => of({ type: ActivityActions.ActivityActionTypes.ACTIVITY_SIGNUP_ERROR, err: err }))
      )
    })
  ));

  /* signout */
  signout$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityActions.ActivityActionTypes.ACTIVITY_SIGNOUT),
    mergeMap((action: { type: string, activity: Activity, userId: number }) => {
      const newActivity = { ...action.activity, participatingUsers: action.activity.participatingUsers.filter(userId => userId !== action.userId) };
      return this.as.updateActivity(newActivity).pipe(
        map(() => {
          return { type: ActivityActions.ActivityActionTypes.ACTIVITY_SIGNOUT_SUCCESS, activity: newActivity }
        }),
        catchError(err => of({ type: ActivityActions.ActivityActionTypes.ACTIVITY_SIGNOUT_ERROR, err: err }))
      )
    })
  ));

}