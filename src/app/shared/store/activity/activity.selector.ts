import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStore } from '@store/root.state';
import { UserState } from '@store/user/user.state';
import { ActivityState } from './activity.state';


/* Select a feature from state, in this case we only have one feature called todoList but 
 * in bigger applications the state could be more bigger. At some component maybe we only
 * need a piece of state (feature) and we select that piece here
 */
//export const selectTodoList = (state: AppStore) => state.todoList;

/* This line of code do exactly the same job that the above one. createFeatureSelector is 
 * an optimization to get a top level feature state (acording to ngrx documentation).
 * Since todoList is a top level feature we better use createFeatureSelector.
 */
export const selectActivityState = createFeatureSelector<AppStore, ActivityState>('activityState');

export const selectActivities = createSelector(selectActivityState, (state: ActivityState) => state.activities);
export const selectActivityToShow = createSelector(selectActivityState, (state: ActivityState) => state.activityToShow);
export const selectAllActivityState = createSelector(selectActivityState, (state: ActivityState) => state);