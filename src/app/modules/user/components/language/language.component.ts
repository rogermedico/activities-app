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
import { take } from 'rxjs/operators';
import { UserState } from '@store/user/user.state';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit, OnDestroy {

  public title: string = 'Languages';
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public languages$: Observable<Language[]> = this.store$.select(UserSelectors.selectLanguages);
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public userSubscriber: Subscription;
  public displayedColumns: string[] = ['language', 'level', 'finishDate', 'actions'];

  constructor(private router: Router, private store$: Store<AppStore>) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.userSubscriber) this.userSubscriber.unsubscribe();
  }

  createLanguage() {
    this.router.navigate(['/user/language']);
  }

  updateLanguage(i: number) {
    this.router.navigate(['/user/language', i]);
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


