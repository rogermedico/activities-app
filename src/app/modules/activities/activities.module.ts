import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesListComponent } from './components/activities-list/activities-list.component';
import { ActivitiesDetailsComponent } from './components/activities-details/activities-details.component';
import { AdminActivitiesComponent } from './components/admin-activities/admin-activities.component';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { AdminActivitiesCrudComponent } from './components/admin-activities-crud/admin-activities-crud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ActivitiesListComponent,
    ActivitiesDetailsComponent,
    AdminActivitiesComponent,
    AdminActivitiesCrudComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    ActivitiesListComponent,
    ActivitiesDetailsComponent
  ],
})
export class ActivitiesModule { }
