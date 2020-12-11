import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppStore } from '@store/root.state';
import { Store } from '@ngrx/store';
import * as ActivityActions from '@store/activity/activity.action';
import { Observable, Subscription } from 'rxjs';
import { User } from '@models/user.model';
import * as UserSelectors from '@store/user/user.selector';
import * as UserActions from '@store/user/user.action';
import { USER_TYPES } from '@constants/user-types.constant';
import { Meta } from '@angular/platform-browser';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, map, pairwise, take } from 'rxjs/operators';
import * as ActivitySelectors from '@store/activity/activity.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public userTypes = USER_TYPES;
  public sidenavOpened: boolean;
  public sidenavMode: string;
  public sidenavMarginTop: number;
  public sidenavDisableClose: boolean;

  public XSmallBreakpointSubscriber: Subscription;
  public smallBreakpointSubscriber: Subscription;
  public largeBreakpointSubscriber: Subscription;
  public userStateSubscriber: Subscription;

  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public routerEventsSubscriber: Subscription;
  public activityToShow$: Observable<number> = this.store$.select(ActivitySelectors.selectActivityToShow);
  public activityTopShowSubscriber: Subscription;

  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('sidenavContent') sidenavContent: MatSidenavContent;

  constructor(private store$: Store<AppStore>, private router: Router, private bpo: BreakpointObserver) { }

  ngOnInit(): void {
    this.store$.dispatch(ActivityActions.ActivitiesLoad());

    this.XSmallBreakpointSubscriber = this.bpo.observe([Breakpoints.XSmall]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.sidenavMarginTop = 56;
      }
    });
    this.smallBreakpointSubscriber = this.bpo.observe([Breakpoints.Small]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.sidenavMarginTop = 64;
      }
    });
    this.largeBreakpointSubscriber = this.bpo.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.sidenavMarginTop = 64;
        if (this.sidenav) this.sidenav.close();

      }
    });

    this.routerEventsSubscriber = this.router.events.pipe(
      filter(e => e instanceof RoutesRecognized),
      pairwise(),
      map((e: [RoutesRecognized, RoutesRecognized]) => e)
    ).subscribe(e => {
      const url = e[1].url.split('/');
      const previousUrl = e[0].url.split('/');
      if (!(url.includes('profile') && previousUrl.includes('profile')) &&
        !(url.includes('education') && previousUrl.includes('education')) &&
        !(url.includes('languages') && previousUrl.includes('languages'))) {
        this.store$.dispatch(UserActions.UserResetFlags());
      }
    });

  }

  ngAfterViewInit() {
    this.activityTopShowSubscriber = this.activityToShow$.subscribe(() => {
      if (this.sidenavContent) this.sidenavContent.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  ngOnDestroy(): void {
    this.XSmallBreakpointSubscriber.unsubscribe();
    this.smallBreakpointSubscriber.unsubscribe();
    this.largeBreakpointSubscriber.unsubscribe();
    this.userStateSubscriber.unsubscribe();
    this.routerEventsSubscriber.unsubscribe();
    this.activityTopShowSubscriber.unsubscribe();
  }

}
