import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./components/users/users.component";
import {LoginComponent} from "./components/login/login.component";
import {CreateUserComponent} from "./components/create-user/create-user.component";
import {UpdateUserComponent} from "./components/update-user/update-user.component";
import {TokenGuard} from "./guards/token.guard";
import {HomeComponent} from "./components/home/home.component";
import {RoleEnum} from "./model/role-enum";

const routes: Routes = [
  {
    path: "users",
    component: UsersComponent,
    canActivate: [TokenGuard],
    data: {roles: [RoleEnum.READ, RoleEnum.UPDATE, RoleEnum.DELETE]}
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "create-user",
    component: CreateUserComponent,
    canActivate: [TokenGuard],
    data: {roles: [RoleEnum.CREATE]}
  },
  {
    path: "update-user/:userId",
    component: UpdateUserComponent,
    canActivate: [TokenGuard],
    data: {roles: [RoleEnum.UPDATE]}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
