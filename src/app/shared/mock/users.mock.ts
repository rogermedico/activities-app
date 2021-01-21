import { EDUCATION_TYPE, EDUCATION_TYPE_CICLE, EDUCATION_TYPE_UNIVERSITY } from '@constants/education.constant';
import { LANGUAGES, LANGUAGE_LEVELS } from '@constants/language.constant';
import { USER_TYPES } from '@constants/user-types.constant';
import { User } from "@models/user.model";

export const USERS_MOCK_DATA: User[] = [
  {
    id: 1,
    name: "john",
    surname: "smith",
    type: USER_TYPES.tourist,
    email: "user1@gmail.com",
    password: "12341234",
    loggedIn: false,
    education: [{
      type: EDUCATION_TYPE.uni,
      level: EDUCATION_TYPE_UNIVERSITY.grau,
      name: 'Grau en Enginyeria Informàtica',
      university: 'UOC',
      finishDate: '07/10/2010'
    },
    {
      type: EDUCATION_TYPE.fp,
      level: EDUCATION_TYPE_CICLE.gs,
      name: 'Psicologia del renaixement',
      university: 'Institut Joan Guinjoan',
      finishDate: '09/08/2004'
    }],
    languages: [{
      name: LANGUAGES.ca,
      level: LANGUAGE_LEVELS.c2
    },
    {
      name: LANGUAGES.en,
      level: LANGUAGE_LEVELS.b2,
      finishDate: '01/02/0003'
    }]
  },
  {
    id: 2,
    name: "Activitats UOC",
    type: USER_TYPES.company,
    email: "company1@gmail.com",
    password: "12341234",
    loggedIn: false,
    education: [],
    languages: [{
      name: LANGUAGES.fr,
      level: LANGUAGE_LEVELS.a1,
      finishDate: '04/04/2044',
    }]
  },
  {
    id: 3,
    name: "Enoturisme Priorat",
    type: USER_TYPES.company,
    email: "company2@gmail.com",
    password: "12341234",
    loggedIn: false,
    education: [
      {
        type: EDUCATION_TYPE.fp,
        level: EDUCATION_TYPE_CICLE.gs,
        name: 'El ví i les seves propietats',
        university: 'Institut enologic del priorat',
        finishDate: '09/08/1992'
      }
    ],
    languages: [{
      name: LANGUAGES.ca,
      level: LANGUAGE_LEVELS.a2,
      finishDate: '04/04/2044',
    }]
  },
  {
    id: 4,
    name: "joan",
    surname: "pere",
    type: USER_TYPES.tourist,
    email: "user2@gmail.com",
    password: "12341234",
    loggedIn: false,
    education: [{
      type: EDUCATION_TYPE.uni,
      level: EDUCATION_TYPE_UNIVERSITY.grau,
      name: 'Grau en Turisme',
      university: 'Universitat Rovira i Virgili',
      finishDate: '07/10/2010'
    }],
    languages: [{
      name: LANGUAGES.es,
      level: LANGUAGE_LEVELS.c1
    },
    {
      name: LANGUAGES.en,
      level: LANGUAGE_LEVELS.b2,
      finishDate: '01/02/0003'
    }]
  }
];