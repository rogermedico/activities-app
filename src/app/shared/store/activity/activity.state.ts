import { Activity } from '@models/activity.model';

export interface ActivityState {
  activities: Activity[];
  activityToShow: number;
  loading: boolean;
  error: Error;
}