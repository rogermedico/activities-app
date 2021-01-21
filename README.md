# Dictionary

This project is a frontend part of an Activities Organizer App. It has two roles of users, the normal user and the company user. Each role has access to diferent parts of the app.

The user role has access to the following parts:

* Home: where they are able to see all activities, add/remove activities to favourites, see activity details and sign out/sign up to the activities that they want.
* Favorites: similar to home but in this case the user only see the activities in his favourites list.
* My activities: similar to home and favourites but in this case the user only see the activities that he signed up for.
* User: The user can see his profile and modify any detail he wants, including education and language details.

The company role has access to the following parts:

* Home: same as user role but without the possibility to add any activity to favourites and they can't sign in for any activity.
* Admin: page that allows company users admin their and only their activities. They can add, edit, and remove activities owned by them.
* User: Same as user role but with some more options concerning to companyes such as company name, company description and CIF.

Not logged in users only has access to the home page and they can see all activities and details but no more.


## Requirements

[Node.js](http://nodejs.org/) >= 10.15.x


## Getting started

Clone this repository with `git clone`, or download a .zip file using the top right green button.

Using the Terminal, navigate to the project folder and run `npm install`.


## Features

* Uses [Angular](https://angular.io/) as a JS framework.
* Uses [Angular Material](https://material.angular.io/) as a CSS framework.
* Uses [Angular Flex Layout](https://github.com/angular/flex-layout) as a CSS framework.
* Uses [RxJS](https://rxjs-dev.firebaseapp.com/) to manage the asynchronous calls.
* Uses the Redux pattern applied via [NGRX](https://ngrx.io/) to manage the global state of the aplication.
* Application fully responsive. 
* NPM scripts for fast development and production build (see Commands below).


### Commands

| Command | Description |
|---------|-------------|
| `npm run start` | Runs a local web server for development and opens the browser to display it. Automatically compiles styles and scripts whenever a file in `src/` is changed, and live reloads the browser. This is what *must be run* on the development stage. |
| `npm run build` | Compiles, minifies and optimizes the project. Use the `--prod` flag for a production build. These files are the ones that must be used to deploy on production. |


## Live example

[https://jovial-brahmagupta-565dd0.netlify.app/](https://jovial-brahmagupta-565dd0.netlify.app/)