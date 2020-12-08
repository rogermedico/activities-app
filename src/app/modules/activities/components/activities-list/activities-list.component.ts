import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '@models/activity.model';
import { AppStore } from '@store/root.state';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import * as ActivitySelectors from '@store/activity/activity.selector';
import * as ActivityActions from '@store/activity/activity.action';
import { ActivityState } from '@store/activity/activity.state';
import { map, skipWhile, take } from 'rxjs/operators';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {

  public title: String = 'Activities List';
  public activities: Activity[];
  public user: User;
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public userSubscription: Subscription;
  public activitiesState$: Observable<ActivityState> = this.store$.select(ActivitySelectors.selectActivityState);
  public activitiesStateSubscription: Subscription;
  public activities$: Observable<Activity[]> = this.store$.select(ActivitySelectors.selectActivities);
  public activitiesSubscription: Subscription;
  public displayedColumns = ['name', 'language', 'date', 'price', 'actions'];


  constructor(private store$: Store<AppStore>, private router: Router) { }

  ngOnInit(): void {

    this.activitiesStateSubscription = this.activitiesState$.pipe(
      skipWhile(as => as.loading == true),
      take(1),
      map(as => {
        if (as.loaded) this.store$.dispatch(ActivityActions.ActivityDeselect())
      })
    ).subscribe();

    // this.store$.dispatch(ActivityActions.ActivityDeselect());

    this.userSubscription = this.userLoggedIn$.subscribe(userLoggedIn => this.user = userLoggedIn);
    this.activitiesSubscription = this.activities$.subscribe(activities => {
      if (this.router.url === '/favorites') {
        this.activities = activities.filter(ac => this.user.favoriteActivities.find(faId => faId === ac.id));
      }
      else if (this.router.url === '/myactivities') {
        this.activities = activities.filter(ac => ac.participatingUsers.find(id => this.user.id === id));
      }
      else {
        this.activities = activities;
      }
    });

  }

  ngOnDestroy(): void {
    this.activitiesStateSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.activitiesSubscription.unsubscribe();
  }

  showDetails(ac: Activity) {
    this.store$.dispatch(ActivityActions.ActivitySelect({ activityId: ac.id }));
  }

}
