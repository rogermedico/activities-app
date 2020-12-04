import { Component, OnDestroy, OnInit } from '@angular/core';
import { Activity } from '@models/activity.model';
import { AppStore } from '@store/root.state';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { Observable, Subscriber, Subscription } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import * as ActivitySelectors from '@store/activity/activity.selector';
import * as UserActions from '@store/user/user.action';
import * as ActivityActions from '@store/activity/activity.action';
import { ACTIVITY_STATUS } from '@constants/activity-status.constant';
import { map, skipWhile } from 'rxjs/operators';
import { ActivityState } from '@store/activity/activity.state';

@Component({
  selector: 'app-activities-details',
  templateUrl: './activities-details.component.html',
  styleUrls: ['./activities-details.component.css']
})
export class ActivitiesDetailsComponent implements OnInit, OnDestroy {

  public title: String = 'Activity Details';
  public activity: Activity;
  public user: User;
  public favorite: boolean;
  public status: string;
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public userSubscription: Subscription;
  public activityState$: Observable<ActivityState> = this.store$.select(ActivitySelectors.selectAllActivityState);
  public activityStateSubscription: Subscription;

  constructor(private store$: Store<AppStore>) { }

  ngOnInit(): void {

    this.userSubscription = this.userLoggedIn$.pipe(
      skipWhile(user => user === null),
      map(userLoggedIn => {
        this.user = userLoggedIn;
        if (userLoggedIn) {
          if (userLoggedIn.favoriteActivities && this.activity) {
            this.user.favoriteActivities.find(activityId => activityId == this.activity.id) !== undefined ? this.favorite = true : this.favorite = false;
          }
          else this.favorite = false;
        }
      })
    ).subscribe();

    this.activityStateSubscription = this.activityState$.pipe(
      skipWhile(activityState => activityState.loading === true),
      skipWhile(activityState => activityState.activities == null),
      map(activityState => {
        const activity = activityState.activities.find(ac => ac.id === activityState.activityToShow);
        if (activity) {
          this.activity = activity;
          if (this.user) {
            if (this.user.favoriteActivities) {
              this.user.favoriteActivities.find(activityId => activityId == this.activity.id) !== undefined ? this.favorite = true : this.favorite = false;
            }
            else this.favorite = false;
          }
          this.checkStatus(this.activity);
        }
      })
    ).subscribe();

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.activityStateSubscription.unsubscribe();
  }

  checkStatus(ac: Activity) {
    if (ac.state != ACTIVITY_STATUS.cancelled) {
      if (ac.maxCapacity - ac.participatingUsers.length <= 0) {
        this.status = ACTIVITY_STATUS.complete;
      }
      else {
        this.status = ACTIVITY_STATUS.available;
      }
    }
    else {
      this.status = ACTIVITY_STATUS.cancelled;
    }
  }

  toggleFavorite() {
    this.store$.dispatch(UserActions.UserToggleFavoriteActivity({ user: this.user, activityId: this.activity.id }))
  }

  signUp() {
    this.store$.dispatch(ActivityActions.ActivitySignup({ activity: this.activity, userId: this.user.id }));
  }

  signOut() {
    this.store$.dispatch(ActivityActions.ActivitySignout({ activity: this.activity, userId: this.user.id }));
  }

}
