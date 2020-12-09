import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from '@models/education.model';
import { User } from '@models/user.model';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import * as UserActions from '@store/user/user.action';
import { AppStore } from '@store/root.state';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { UserState } from '@store/user/user.state';
import { SnackBarService } from '@services/snack-bar.service';

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

  constructor(private store$: Store<AppStore>, private router: Router, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.userStateSubscription = this.userState$.pipe(
      map(us => {
        if (us.languageCreate) this.snackBarService.openSnackBar('New language created', 'OK', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        if (us.languageEdit) this.snackBarService.openSnackBar('Language successfully updated', 'OK', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        if (us.languageDelete) this.snackBarService.openSnackBar('Language deleted', 'OK', {
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
    this.router.navigate(['/user/education']);
  }

  updateEducation(i: number, e: Education) {
    this.router.navigate(['/user/education', i]);
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
