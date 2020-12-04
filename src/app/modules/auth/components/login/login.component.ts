import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Login } from '@models/login.model';
import { Store } from '@ngrx/store';
import { AppStore } from '@store/root.state';
import * as AuthActions from '@store/auth/auth.action';
import * as AuthSelectors from '@store/auth/auth.selector';
import { Observable, Subscription } from 'rxjs';
import { delay, map, skipWhile } from 'rxjs/operators';
import { AuthState } from '@store/auth/auth.state';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {

  public title: string = 'Login';
  public wrongCredentials: Boolean = false;
  public loginForm: FormGroup;
  public hidePassword: boolean = true;
  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);
  private authStateSubscription: Subscription;

  constructor(private store$: Store<AppStore>, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
    this.authStateSubscription = this.authState$.pipe(
      skipWhile(as => as.loading === true),
      map(as => {
        if (as.wrongCredentials == false && !as.loading) this.router.navigate(['']);
        if (as.wrongCredentials && !as.loading) this.openSnackBar();
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required]],
    });
  }

  login() {

    const loginInfo: Login = {
      username: this.username.value,
      password: this.password.value
    }

    this.store$.dispatch(AuthActions.AuthLogin({ loginInfo: loginInfo }));

  }

  openSnackBar() {
    this.snackBar.open('Wrong user or password, try again', 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.resetForm(this.loginForm);
  }

  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }

}
