import { User } from '@models/user.model';

export interface UserState {
  user: User;
  loading: boolean;
  loaded: boolean;
  edited: boolean;
  saved: boolean;
  error: Error;
}