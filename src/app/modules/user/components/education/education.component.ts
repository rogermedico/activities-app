import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterState, RoutesRecognized } from '@angular/router';
import { Education } from '@models/education.model';
import { User } from '@models/user.model';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import * as UserActions from '@store/user/user.action';
import * as RouterSelectors from '@store/router/router.selector';
import { AppStore } from '@store/root.state';
import { Store } from '@ngrx/store';
import { filter, map, pairwise, take } from 'rxjs/operators';
import { UserState } from '@store/user/user.state';
import { SnackBarService } from '@services/snack-bar.service';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '@store/router/router.state';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit, OnDestroy {

  public title: string = 'Education';
  public user: User;
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userStateSubscription: Subscription;
  public educations$: Observable<Education[]> = this.store$.select(UserSelectors.selectEducation);
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public userSubscription: Subscription;
  public displayedColumns: string[] = ['type', 'level', 'name', 'university', 'finishDate', 'actions'];
  public routerEventsSubscriber: Subscription;

  constructor(private store$: Store<AppStore>, private router: Router, private snackBarService: SnackBarService) { }

  ngOnInit(): void {

    // this.routerStateSubscriber = this.routerState$.pipe(
    //   take(1),
    //   map(rs => {
    //     if (!rs.state.url.split('/').includes('education'))
    //       this.store$.dispatch(UserActions.UserResetFlags())
    //   })
    // ).subscribe();

    this.userStateSubscription = this.userState$.pipe(
      map(us => {
        if (us.educationCreate) this.snackBarService.openSnackBar('New education created', 'OK', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        if (us.educationEdit) this.snackBarService.openSnackBar('Education successfully updated', 'OK', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        if (us.educationDelete) this.snackBarService.openSnackBar('Education deleted', 'OK', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.userStateSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  createEducation() {
    this.router.navigate(['/user/education/new']);
  }

  updateEducation(i: number, e: Education) {
    this.router.navigate(['/user/education/edit', i]);
  }

  deleteEducation(education: Education) {
    if (confirm('You are about to delete an education record. Are you sure?')) {
      this.userSubscription = this.userLoggedIn$.pipe(
        take(1)
      ).subscribe(u => {
        this.store$.dispatch(UserActions.UserDeleteEducation({ user: u, education: education }))
      })
    }
  }

}
