import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./components/users/users.component";
import {LoginComponent} from "./components/login/login.component";
import {CreateUserComponent} from "./components/create-user/create-user.component";
import {EditUserComponent} from "./components/edit-user/edit-user.component";
import {TokenGuard} from "./guards/token.guard";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path: "users",
    component: UsersComponent,
    canActivate: [TokenGuard],
    data: {role: 'CAN_READ_USERS'}
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
    data: {role: 'CAN_CREATE_USERS'}
  },
  {
    path: "edit-user/:userId",
    component: EditUserComponent,
    canActivate: [TokenGuard],
    data: {role: 'CAN_UPDATE_USERS'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
