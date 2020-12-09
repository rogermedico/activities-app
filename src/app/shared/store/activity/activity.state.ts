import { Activity } from '@models/activity.model';

export interface ActivityState {
  activities: Activity[];
  activityToShow: number;
  loading: boolean;
  loaded: boolean;
  activityCreate: boolean;
  activityEdit: boolean;
  activityDelete: boolean;
  error: Error;
}