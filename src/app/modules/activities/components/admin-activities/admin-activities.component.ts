import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '@models/activity.model';
import { AppStore } from '@store/root.state';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import * as ActivitySelectors from '@store/activity/activity.selector';
import * as ActivityActions from '@store/activity/activity.action';

@Component({
  selector: 'app-admin-activities',
  templateUrl: './admin-activities.component.html',
  styleUrls: ['./admin-activities.component.css']
})
export class AdminActivitiesComponent implements OnInit, OnDestroy {

  public title: String = 'Edit Activities';
  public user: User;
  public activities: Activity[];
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public userSubscription: Subscription;
  public activities$: Observable<Activity[]> = this.store$.select(ActivitySelectors.selectActivities);
  public activitiesSubscription: Subscription;

  constructor(private store$: Store<AppStore>, private router: Router) { }

  ngOnInit(): void {

    this.userSubscription = this.userLoggedIn$.subscribe(userLoggedIn => this.user = userLoggedIn);
    this.activitiesSubscription = this.activities$.subscribe(activities => {
      this.activities = activities.filter(ac => ac.owner === this.user.id);
    })

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.activitiesSubscription.unsubscribe();
  }

  createActivity() {
    this.router.navigate(['/activities/admin/new']);
  }

  updateActivity(id: number) {
    this.router.navigate(['/activities/admin/edit', id]);
  }

  deleteActivity(activityId: number) {
    if (confirm('You are about to delete an activity record. Are you sure?')) {
      this.store$.dispatch(ActivityActions.ActivityDelete({ activityId: activityId }))
    }
  }

}
