import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '@models/user.model';
import { Activity } from '@models/activity.model';
import { USER_TYPES } from '@constants/user-types.constant';
import { CATEGORY_TYPES } from '@constants/category-types.constant';
import { SUBCATEGORY_TYPES_BEACH, SUBCATEGORY_TYPES_CULTURE, SUBCATEGORY_TYPES_ENOTURISME } from '@constants/subcategory-types.constant';
import { LANGUAGES, LANGUAGE_LEVELS } from '@constants/language.constant';
import { ACTIVITY_STATUS } from '@constants/activity-status.constant';
import { EDUCATION_TYPE, EDUCATION_TYPE_CICLE, EDUCATION_TYPE_UNIVERSITY } from '@constants/education.constant';
import { USERS_MOCK_DATA } from '@mock/users.mock';
import { ACTIVITIES_MOCK_DATA } from '@mock/activities.mock';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {

    const users: User[] = USERS_MOCK_DATA;
    const activities: Activity[] = ACTIVITIES_MOCK_DATA;

    return { users, activities };
  }

  genId(users: any): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }
}
