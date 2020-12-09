import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Language } from '@models/language.model';
import { AppStore } from '@store/root.state';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import * as UserActions from '@store/user/user.action';
import * as RouterSelectors from '@store/router/router.selector';
import { map, take } from 'rxjs/operators';
import { UserState } from '@store/user/user.state';
import { SnackBarService } from '@services/snack-bar.service';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '@store/router/router.state';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit, OnDestroy {

  public title: string = 'Languages';
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userStateSubscription: Subscription;
  public languages$: Observable<Language[]> = this.store$.select(UserSelectors.selectLanguages);
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public userSubscriber: Subscription;
  public displayedColumns: string[] = ['language', 'level', 'finishDate', 'actions'];

  constructor(private router: Router, private store$: Store<AppStore>, private snackBarService: SnackBarService) { }

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
    if (this.userSubscriber) this.userSubscriber.unsubscribe();
  }

  createLanguage() {
    this.router.navigate(['/user/languages/new']);
  }

  updateLanguage(i: number) {
    this.router.navigate(['/user/languages/edit', i]);
  }

  deleteLanguage(language: Language) {
    if (confirm('You are about to delete a language record. Are you sure?')) {
      this.userSubscriber = this.userLoggedIn$.pipe(
        take(1)
      ).subscribe(u => {
        this.store$.dispatch(UserActions.UserDeleteLanguage({ user: u, language: language }))
      })
    }
  }

}


