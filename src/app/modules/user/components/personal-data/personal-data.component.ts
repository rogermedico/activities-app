import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NATIONALITIES } from '@constants/nationalities.constant';
import { AppStore } from '@store/root.state';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { nifValidator } from '@validators/nif.validator';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import { map, take, tap } from 'rxjs/operators';
import { USER_TYPES } from '@constants/user-types.constant';
import * as UserActions from '@store/user/user.action';
import { UserState } from '@store/user/user.state';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit, OnDestroy {

  public title: string = 'Profile';
  public nationalities = Object.values(NATIONALITIES);
  public userTypes = USER_TYPES;
  public user: User;
  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public userSubscriber: Subscription;
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userStateSubscriber: Subscription;
  public snackBarSubscription: Subscription;
  public profileSaved: Boolean = false;
  public profileForm: FormGroup;
  public profileFormValueChangesSubscriber: Subscription;

  constructor(private store$: Store<AppStore>, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.userSubscriber = this.userLoggedIn$.pipe(
      take(1),
      tap(user => this.user = user),
      tap(user => this.createForm(user))
    ).subscribe();

    this.profileFormValueChangesSubscriber = this.profileForm.valueChanges.pipe(
      map(() => this.userStateSubscriber = this.userState$.pipe(
        take(1),
        map(us => {
          if (!us.edited) this.store$.dispatch(UserActions.UserModifyPersonalData());
        })
      ).subscribe()
      )
    ).subscribe();

    this.snackBarSubscription = this.userState$.pipe(
      map(us => {
        if (us.loaded && !us.edited && this.profileSaved) {
          this.openSnackBar();
          console.log('open snak bar')
        }
      })
    ).subscribe();


  }

  ngOnDestroy(): void {
    this.userSubscriber.unsubscribe();
    if (this.userStateSubscriber) this.userStateSubscriber.unsubscribe();
    this.profileFormValueChangesSubscriber.unsubscribe();
    this.snackBarSubscription.unsubscribe();
  }

  createForm(u: User) {
    this.profileForm = this.fb.group({
      name: [u.name, [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^(?![ ])(?!.*[ ]$)[a-zA-Z ]+$')]],
      surname: [u.surname, [Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^(?![ ])(?!.*[ ]$)[a-zA-Z ]+$')]],
      birthDate: [u.birthDate, Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\\d{4}$')],
      phone: [u.phone, Validators.pattern('^[0-9]+$')],
      nationality: [u.nationality ? u.nationality : null],
      nif: [u.nif ? u.nif : null],
      aboutMe: [u.aboutMe ? u.aboutMe : null]
    },
      {
        validators: nifValidator
      }
    );
    if (u.type === USER_TYPES.company) {
      this.profileForm.addControl('companyName', this.fb.control(u.companyName, [Validators.required, Validators.minLength(3), Validators.maxLength(55), Validators.pattern('^(?![ ])(?!.*[ ]$)[a-zA-Z ]+$')]));
      this.profileForm.addControl('companyDescription', this.fb.control(u.companyDescription));
      this.profileForm.addControl('cif', this.fb.control(u.cif));
    }

  }

  updateProfile() {
    if (this.profileForm.valid) {
      const user: User = {
        ...this.user,
        name: this.name.value,
        surname: this.surname.value,
        birthDate: this.birthDate.value,
        phone: this.phone.value,
        nationality: this.nationality.value,
        nif: this.nif.value,
        aboutMe: this.aboutMe.value
      }
      if (this.user.type === this.userTypes.company) {
        user.companyName = this.companyName.value;
        user.companyDescription = this.companyDescription.value;
        user.cif = this.cif.value;
      }

      this.store$.dispatch(UserActions.UserUpdatePersonalData({ user: user }));
      this.profileSaved = true;
    }
  }

  openSnackBar() {
    this.snackBar.open('Profile successfully updated', 'OK', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.profileSaved = false;
  }

  get name() { return this.profileForm.get('name'); }

  get surname() { return this.profileForm.get('surname'); }

  get birthDate() { return this.profileForm.get('birthDate'); }

  get phone() { return this.profileForm.get('phone'); }

  get nationality() { return this.profileForm.get('nationality'); }

  get nif() { return this.profileForm.get('nif'); }

  get aboutMe() { return this.profileForm.get('aboutMe'); }

  get companyName() { return this.profileForm.get('companyName'); }

  get companyDescription() { return this.profileForm.get('companyDescription'); }

  get cif() { return this.profileForm.get('cif'); }

}
