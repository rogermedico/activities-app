import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LANGUAGES, LANGUAGE_LEVELS } from '@constants/language.constant';
import { Language } from '@models/language.model';
import { AppStore } from '@store/root.state';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import * as UserActions from '@store/user/user.action';
import * as RouterSelectors from '@store/router/router.selector';
import { map, skipWhile, take } from 'rxjs/operators';
import { UserState } from '@store/user/user.state';

@Component({
  selector: 'app-language-crud',
  templateUrl: './language-crud.component.html',
  styleUrls: ['./language-crud.component.scss']
})
export class LanguageCrudComponent implements OnInit {

  public title: String;
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userStateSubscription: Subscription;
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public user: User;
  public userSubscription: Subscription;
  public RouteParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsSubscription: Subscription;
  public language: Language = {
    name: null,
    level: null,
    finishDate: ''
  };
  public languageIndex: number;
  public languageForm: FormGroup;
  public buttonTag: string;
  public languageNames = Object.values(LANGUAGES);
  public languageLevels = Object.values(LANGUAGE_LEVELS);

  constructor(private store$: Store<AppStore>, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.routeParamsSubscription = this.RouteParams$.subscribe(p => this.languageIndex = p.id);

    this.userSubscription = this.userLoggedIn$.subscribe(u => {
      if ((this.languageIndex != null) && (this.languageIndex >= 0) && (this.languageIndex < u.languages.length)) {
        this.title = 'Edit language';
        this.buttonTag = 'Update language';
        this.language = u.languages[this.languageIndex];
      }
      else {
        this.title = 'Create new language';
        this.buttonTag = 'Create language';
      }

      this.createForm(this.language);
      this.user = u;

    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.routeParamsSubscription.unsubscribe();
    if (this.userStateSubscription) this.userStateSubscription.unsubscribe();
  }

  createForm(lang: Language) {
    this.languageForm = this.fb.group({
      name: [lang.name ? lang.name : null, [Validators.required]],
      level: [lang.level ? lang.level : null, [Validators.required]],
      finishDate: [lang.finishDate ? lang.finishDate : null, [Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\\d{4}$')]]
    });
  }

  handleLanguageForm() {
    const lang: Language = {
      name: this.name.value,
      level: this.level.value,
      finishDate: this.finishDate.value
    }

    if (this.languageIndex != null) {
      this.store$.dispatch(UserActions.UserUpdateLanguage({ user: this.user, oldLanguage: this.language, newLanguage: lang }));
    }
    else {
      this.store$.dispatch(UserActions.UserCreateLanguage({ user: this.user, language: lang }));
    }

    this.userLoggedIn$.pipe(
      take(1)
    ).subscribe(u => {

    });

    this.userStateSubscription = this.userState$.pipe(
      skipWhile(us => us.loading === true),
      map(us => {
        if (us.loaded) this.router.navigate(['/user/languages']);
      })
    ).subscribe();

  }

  get name() {
    return this.languageForm.get('name');
  }

  get level() {
    return this.languageForm.get('level');
  }

  get finishDate() {
    return this.languageForm.get('finishDate');
  }

}
