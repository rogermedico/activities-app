import { Component, OnInit } from '@angular/core';
import { AppStore } from '@store/root.state';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserSelectors from '@store/user/user.selector';
import { USER_TYPES } from '@constants/user-types.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public title: string = 'UOC activities organizer';

  public userLoggedIn$: Observable<User> = this.store$.select(UserSelectors.selectUser);
  public userTypes = USER_TYPES;

  constructor(private store$: Store<AppStore>) { }

  ngOnInit(): void {

  }

}
