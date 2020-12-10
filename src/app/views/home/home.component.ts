import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivityState } from '@store/activity/activity.state';
import { AppStore } from '@store/root.state';
import { Observable } from 'rxjs';
import * as ActivitySelectors from '@store/activity/activity.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
