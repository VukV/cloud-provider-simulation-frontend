import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { PopupComponent } from './components/popup/popup.component';
import { HomeComponent } from './components/home/home.component';
import { MachineErrorsComponent } from './components/machine-errors/machine-errors.component';
import { MachinesComponent } from './components/machines/machines.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    UpdateUserComponent,
    CreateUserComponent,
    PopupComponent,
    HomeComponent,
    MachineErrorsComponent,
    MachinesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
