import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CATEGORY_TYPES } from '@constants/category-types.constant';
import { LANGUAGES } from '@constants/language.constant';
import { SUBCATEGORY_TYPES_BEACH, SUBCATEGORY_TYPES_CULTURE, SUBCATEGORY_TYPES_ENOTURISME } from '@constants/subcategory-types.constant';
import { Activity } from '@models/activity.model';
import { AppStore } from '@store/root.state';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { ActivitiesService } from '@services/activities.service';
import { UserService } from '@services/user.service';
import { maxCapacityValidator } from '@validators/max-capacity.validator';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import * as ActivitySelectors from '@store/activity/activity.selector';
import * as RouterSelectors from '@store/router/router.selector';
import * as ActivityActions from '@store/activity/activity.action';
import { ACTIVITY_STATUS } from '@constants/activity-status.constant';
import { map, skipWhile, take } from 'rxjs/operators';
import { UserState } from '@store/user/user.state';
import { ActivityState } from '@store/activity/activity.state';

@Component({
  selector: 'app-admin-activities-crud',
  templateUrl: './admin-activities-crud.component.html',
  styleUrls: ['./admin-activities-crud.component.scss']
})
export class AdminActivitiesCrudComponent implements OnInit, OnDestroy {


  public title: String;
  public user: User;
  public activitiesState$: Observable<ActivityState> = this.store$.select(ActivitySelectors.selectActivityState);
  public activitiesStateSubscription: Subscription;
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public userSubscription: Subscription;
  public RouteParams$: Observable<Params> = this.store$.select(RouterSelectors.selectParams);
  public routeParamsSubscription: Subscription;
  public activities$: Observable<Activity[]> = this.store$.select(ActivitySelectors.selectActivities);
  public activitiesSubscription: Subscription;
  public activity: Activity = {
    name: null,
    category: null,
    subcategory: null,
    language: null,
    price: null,
    miniumCapacity: null,
    maxCapacity: null,
    state: null,
    owner: null,
    participatingUsers: []
  };
  public activityIndex: number;
  public activityForm: FormGroup;
  public buttonTag: string;
  public categoryTypes = Object.values(CATEGORY_TYPES);
  public subcategoryCulture = Object.values(SUBCATEGORY_TYPES_CULTURE);
  public subcategoryEnoturisme = Object.values(SUBCATEGORY_TYPES_ENOTURISME);
  public subcategoryBeach = Object.values(SUBCATEGORY_TYPES_BEACH);
  public languages = Object.values(LANGUAGES);
  public activityStatus = Object.values(ACTIVITY_STATUS);
  public ACTIVITY_STATUS = ACTIVITY_STATUS;
  public CATEGORY_TYPES = CATEGORY_TYPES;

  constructor(private store$: Store<AppStore>, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.userSubscription = this.userLoggedIn$.subscribe(userLoggedIn => this.user = userLoggedIn);

    this.routeParamsSubscription = this.RouteParams$.subscribe(p => this.activityIndex = p.id);
    // this.activityIndex = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    // this.activityIndex = Number.isNaN(this.activityIndex) ? null : this.activityIndex;

    this.activitiesSubscription = this.activities$.pipe(
      map(activities => {
        if (this.user && this.activityIndex != null) {
          this.activity = activities.find((ac) => ac.id == this.activityIndex);
          this.title = 'Edit activity';
          this.buttonTag = 'Update activity';
        }
        else {
          this.title = 'Create new activity';
          this.buttonTag = 'Create activity';
        }

        this.createForm(this.activity);

      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.routeParamsSubscription.unsubscribe();
    this.activitiesSubscription.unsubscribe();
    if (this.activitiesStateSubscription) this.activitiesStateSubscription.unsubscribe();
  }

  createForm(ac: Activity) {
    this.activityForm = this.fb.group({
      name: [ac.name ? ac.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(55)]],
      category: [ac.category ? ac.category : null, [Validators.required]],
      subcategory: [{ value: (ac.subcategory ? ac.subcategory : null), disabled: !ac.category }, [Validators.required]],
      description: [ac.description ? ac.description : null],
      language: [ac.language ? ac.language : null, [Validators.required]],
      date: [ac.date ? ac.date : null, [Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\\d{4}$')]],
      price: [ac.price ? ac.price : null, [Validators.required, Validators.pattern('^[1-9]\\d*$')]],
      miniumCapacity: [ac.miniumCapacity ? ac.miniumCapacity : null, [Validators.required, Validators.pattern('^[1-9]\\d*$')]],
      maxCapacity: [ac.maxCapacity ? ac.maxCapacity : null, [Validators.required, Validators.pattern('^[1-9]\\d*$')]],
      state: [ac.state ? ac.state : null, [Validators.required]]
    },
      {
        validators: maxCapacityValidator
      }
    );

    this.category.valueChanges.subscribe(
      (value) => {
        this.activityForm.patchValue({
          subcategory: ''
        });
        if (value != '') {
          this.subcategory.enable({ emitEvent: false });
        } else {
          this.subcategory.disable({ emitEvent: false });
        }
      }
    );

  }

  handleActivityForm() {
    const activity: Activity = {
      name: this.name.value,
      category: this.category.value,
      subcategory: this.subcategory.value,
      description: this.description.value,
      language: this.language.value,
      date: this.date.value,
      price: this.price.value,
      miniumCapacity: this.miniumCapacity.value,
      maxCapacity: this.maxCapacity.value,
      state: this.state.value,
      owner: this.user.id,
      participatingUsers: this.state.value != 'Cancelled' ? this.activity.participatingUsers : []
    };

    if (this.activityIndex != null) {
      activity.id = this.activityIndex;
      this.store$.dispatch(ActivityActions.ActivityUpdate({ activity: activity }));
    }
    else {
      this.store$.dispatch(ActivityActions.ActivityCreate({ activity: activity }));
    }

    this.activitiesStateSubscription = this.activitiesState$.pipe(
      skipWhile(as => as.loading === true),
      map(as => {
        if (as.loaded) this.router.navigate(['/activities/admin']);
      })
    ).subscribe();

  }

  get name() {
    return this.activityForm.get('name');
  }

  get category() {
    return this.activityForm.get('category');
  }

  get subcategory() {
    return this.activityForm.get('subcategory');
  }

  get description() {
    return this.activityForm.get('description');
  }

  get language() {
    return this.activityForm.get('language');
  }

  get date() {
    return this.activityForm.get('date');
  }

  get price() {
    return this.activityForm.get('price');
  }

  get miniumCapacity() {
    return this.activityForm.get('miniumCapacity');
  }

  get maxCapacity() {
    return this.activityForm.get('maxCapacity');
  }

  get state() {
    return this.activityForm.get('state');
  }

}
