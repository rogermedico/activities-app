import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from '@models/education.model';
import { User } from '@models/user.model';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import * as UserActions from '@store/user/user.action';
import { AppStore } from '@store/root.state';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit, OnDestroy {

  public title: string = 'Education';
  public user: User;
  public educations$: Observable<Education[]> = this.store$.select(UserSelectors.selectEducation);
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public userSubscription: Subscription;
  public displayedColumns: string[] = ['type', 'level', 'name', 'university', 'finishDate'];

  constructor(private store$: Store<AppStore>, private router: Router,) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
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
