import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { LogoutGuardService } from '@guards/logout-guard.service';
import { PersonalDataGuard } from '@guards/personal-data-guard.service';

import { ProfileComponent } from './components/profile/profile.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { EducationComponent } from './components/education/education.component';
import { EducationCrudComponent } from './components/education-crud/education-crud.component';
import { LanguageComponent } from './components/language/language.component';
import { LanguageCrudComponent } from './components/language-crud/language-crud.component';


const routes: Routes = [
  { path: "profile", component: PersonalDataComponent, canActivate: [LogoutGuardService], canDeactivate: [PersonalDataGuard] },
  { path: "education", component: EducationComponent, canActivate: [LogoutGuardService] },
  { path: "education/new", component: EducationCrudComponent, canActivate: [LogoutGuardService] },
  { path: "education/edit/:id", component: EducationCrudComponent, canActivate: [LogoutGuardService] },
  { path: "languages", component: LanguageComponent, canActivate: [LogoutGuardService] },
  { path: "languages/new", component: LanguageCrudComponent, canActivate: [LogoutGuardService] },
  { path: "languages/edit/:id", component: LanguageCrudComponent, canActivate: [LogoutGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PersonalDataGuard]
})
export class UserRoutingModule { }
