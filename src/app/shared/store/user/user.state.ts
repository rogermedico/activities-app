import { User } from '@models/user.model';

export interface UserState {
  user: User;
  loading: boolean;
  loaded: boolean;
  edited: boolean;
  saved: boolean;
  profileEdit: boolean;
  educationCreate: boolean;
  educationEdit: boolean;
  educationDelete: boolean;
  languageCreate: boolean;
  languageEdit: boolean;
  languageDelete: boolean;
  error: Error;
}