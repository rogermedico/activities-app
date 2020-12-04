import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { LogoutGuardService } from '@guards/logout-guard.service';
import { CompanyLoginGuardService } from '@guards/company-login-guard.service';

import { AdminActivitiesComponent } from './components/admin-activities/admin-activities.component';
import { AdminActivitiesCrudComponent } from './components/admin-activities-crud/admin-activities-crud.component';



const routes: Routes = [
  { path: "admin", component: AdminActivitiesComponent, canActivate: [LogoutGuardService, CompanyLoginGuardService] },
  { path: "admin/new", component: AdminActivitiesCrudComponent, canActivate: [LogoutGuardService, CompanyLoginGuardService] },
  { path: "admin/edit/:id", component: AdminActivitiesCrudComponent, canActivate: [LogoutGuardService, CompanyLoginGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
