import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EDUCATION_TYPE, EDUCATION_TYPE_CICLE, EDUCATION_TYPE_UNIVERSITY } from '@constants/education.constant';
import { Education } from '@models/education.model';
import { User } from '@models/user.model';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import * as UserActions from '@store/user/user.action';
import { map, skipWhile, take } from 'rxjs/operators';
import { AppStore } from '@store/root.state';
import { Store } from '@ngrx/store';
import * as RouterSelectors from '@store/router/router.selector';
import { UserState } from '@store/user/user.state';

@Component({
  selector: 'app-education-crud',
  templateUrl: './education-crud.component.html',
  styleUrls: ['./education-crud.component.scss']
})
export class EducationCrudComponent implements OnInit, OnDestroy {

  public title: String;
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userStateSubscription: Subscription;
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public userSubscription: Subscription;
  public userLoggedIn: User;
  public RouteParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsSubscription: Subscription;
  public education: Education = {
    type: null,
    level: null,
    name: '',
    university: ''
  };
  public educationIndex: number;
  public educationForm: FormGroup;
  public buttonTag: string;
  public educationTypes = Object.values(EDUCATION_TYPE);
  public universityLevels = Object.values(EDUCATION_TYPE_UNIVERSITY);
  public cicleLevels = Object.values(EDUCATION_TYPE_CICLE);

  constructor(private store$: Store<AppStore>, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.routeParamsSubscription = this.RouteParams$.subscribe(p => this.educationIndex = p.id);

    this.userSubscription = this.userLoggedIn$.subscribe(u => {
      if ((this.educationIndex != null) && (this.educationIndex >= 0) && (this.educationIndex < u.education.length)) {
        this.title = 'Edit education';
        this.buttonTag = 'Update education';
        this.education = u.education[this.educationIndex];
      }
      else {
        this.title = 'Create new education';
        this.buttonTag = 'Create education';
      }
      this.createForm(this.education);
      this.userLoggedIn = u;
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.routeParamsSubscription.unsubscribe();
    if (this.userStateSubscription) this.userStateSubscription.unsubscribe();
  }

  createForm(e: Education) {
    this.educationForm = this.fb.group({
      type: [e.type ? e.type : null, [Validators.required]],
      level: [{ value: (e.level ? e.level : null), disabled: !e.level }, [Validators.required]],
      name: [e.name ? e.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(55)]],
      university: [e.university ? e.university : null, [Validators.required, Validators.minLength(3), Validators.maxLength(55)]],
      finishDate: [e.finishDate ? e.finishDate : null, [Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\\d{4}$')]]
    }
    );

    this.type.valueChanges.subscribe(
      (value) => {
        this.education.level = null;
        this.educationForm.patchValue({
          level: ''
        });
        if (value != '') {
          this.level.enable({ emitEvent: false });
        } else {
          this.level.disable({ emitEvent: false });
        }
      }
    );

  }

  handleEducationForm() {
    const edu: Education = {
      type: this.type.value,
      level: this.level.value,
      name: this.name.value,
      university: this.university.value,
      finishDate: this.finishDate.value
    }

    if (this.educationIndex != null) {
      this.store$.dispatch(UserActions.UserUpdateEducation({ user: this.userLoggedIn, oldEducation: this.education, newEducation: edu }));
    }
    else {
      this.store$.dispatch(UserActions.UserCreateEducation({ user: this.userLoggedIn, education: edu }));
    }

    this.userStateSubscription = this.userState$.pipe(
      skipWhile(us => us.loading === true),
      map(us => {
        if (us.loaded) this.router.navigate(['/user/education']);
      })
    ).subscribe();

  }

  get type() {
    return this.educationForm.get('type');
  }

  get level() {
    return this.educationForm.get('level');
  }

  get name() {
    return this.educationForm.get('name');
  }

  get university() {
    return this.educationForm.get('university');
  }

  get finishDate() {
    return this.educationForm.get('finishDate');
  }

}
