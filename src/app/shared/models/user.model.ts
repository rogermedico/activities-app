import { USER_TYPES } from '@constants/user-types.constant';
import { NATIONALITIES } from '@constants/nationalities.constant';
import { Education } from '@models/education.model';
import { Language } from '@models/language.model';

export interface User {
  id?: number;
  name: string;
  surname?: string;
  companyName?: string;
  companyDescription?: string;
  cif?: string;
  type: USER_TYPES;
  email: string;
  password: string;
  birthDate?: string;
  phone?: number;
  nationality?: NATIONALITIES;
  nif?: string;
  aboutMe?: string;
  education: Education[];
  languages: Language[];
  loggedIn: boolean;
  favoriteActivities?: number[];
}
