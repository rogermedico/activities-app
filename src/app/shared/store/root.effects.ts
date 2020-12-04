import { ActivityEffects } from './activity/activity.effects';
import { AuthEffects } from './auth/auth.effects';
import { UserEffects } from './user/user.effects';

export const effects = [
  AuthEffects,
  UserEffects,
  ActivityEffects,
];