import { Component, OnInit } from '@angular/core';
import { AppStore } from '@store/root.state';
import { Store } from '@ngrx/store';
import * as ActivityActions from '@store/activity/activity.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store$: Store<AppStore>) { }

  ngOnInit(): void {
    this.store$.dispatch(ActivityActions.ActivitiesLoad());
  }

}
