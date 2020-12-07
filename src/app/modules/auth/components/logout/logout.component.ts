import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from '@store/root.state';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.action';
import * as UserSelectors from '@store/user/user.selector';
import { Observable, Subscription } from 'rxjs';
import { User } from '@models/user.model';
import { map, take } from 'rxjs/operators';
import { AuthState } from '@store/auth/auth.state';
import * as AuthSelectors from '@store/auth/auth.selector';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit, OnDestroy {

  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  private userSubscription: Subscription;
  public authState$: Observable<AuthState> = this.store$.select(AuthSelectors.selectAuthState);
  private authStateSubscription: Subscription;

  constructor(private store$: Store<AppStore>, private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.userLoggedIn$.pipe(
      take(1),
      map(user => {
        this.store$.dispatch(AuthActions.AuthLogout({ user: user }))
      })
    ).subscribe();

    this.authStateSubscription = this.authState$.pipe(
      map(as => {
        if (as.loaded) this.router.navigate(['']);
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
