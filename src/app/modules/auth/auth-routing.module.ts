import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { LogoutComponent } from './components/logout/logout.component';

import { LoginGuardService } from '@guards/login-guard.service';
import { LogoutGuardService } from '@guards/logout-guard.service';
import { PersonalDataGuard } from '@guards/personal-data-guard.service';

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [LoginGuardService] },
  { path: "register", component: RegisterComponent, canActivate: [LoginGuardService] },
  { path: "logout", component: LogoutComponent, canActivate: [LogoutGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PersonalDataGuard]
})
export class AuthRoutingModule { }
