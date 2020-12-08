import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserSelectors from '@store/user/user.selector';
import { UserState } from '@store/user/user.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);

  constructor(private store$: Store) { }

  ngOnInit(): void {
  }

}
