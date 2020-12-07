import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { UserRoutingModule } from "./user-routing.module";
import { ProfileComponent } from './components/profile/profile.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { EducationComponent } from './components/education/education.component';
import { EducationCrudComponent } from './components/education-crud/education-crud.component';
import { LanguageComponent } from './components/language/language.component';
import { LanguageCrudComponent } from './components/language-crud/language-crud.component';
import { MaterialModule } from '@modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ProfileComponent,
    PersonalDataComponent,
    EducationComponent,
    EducationCrudComponent,
    LanguageComponent,
    LanguageCrudComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class UserModule { }
