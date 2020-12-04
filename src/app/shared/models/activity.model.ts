import { CATEGORY_TYPES } from '@constants/category-types.constant';
import { SUBCATEGORY_TYPES_CULTURE, SUBCATEGORY_TYPES_ENOTURISME, SUBCATEGORY_TYPES_BEACH } from '@constants/subcategory-types.constant';
import { LANGUAGES } from '@constants/language.constant';
import { ACTIVITY_STATUS } from '@constants/activity-status.constant';

export interface Activity {
  id?: number;
  name: string;
  category: CATEGORY_TYPES;
  subcategory: SUBCATEGORY_TYPES_CULTURE | SUBCATEGORY_TYPES_ENOTURISME | SUBCATEGORY_TYPES_BEACH;
  description?: string;
  language: LANGUAGES;
  date?: string;
  price: number;
  miniumCapacity: number;
  maxCapacity: number;
  state: ACTIVITY_STATUS;
  owner: number;
  participatingUsers: number[];
}
