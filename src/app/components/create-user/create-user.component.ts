import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../popup/popup.component";
import {RoleResponse} from "../../model/responses/role-response";
import {RoleService} from "../../services/role.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  email: string = "";
  name: string = "";
  surname: string = "";
  password: string = "";
  emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  roles: RoleResponse[] = []

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.getRoles();
  }

  createUser(){
    if(this.checkNameAndSurname() && this.checkEmail() && this.checkPassword()){
      //todo post user
    }
    else {
      this.openPopup("Error!", "Invalid input.");
    }
  }

  private getRoles(){
    this.roleService.getRoles().subscribe((roles) => {
      for(let r of roles){
        r.isSelected = false;
      }
      this.roles = roles;
    }, error => {
      this.openPopup("Error!", error.message);
    });
  }

  private checkNameAndSurname(): boolean{
    return this.name != "" && this.surname != "";
  }

  private checkEmail(): boolean{
    return this.emailRegex.test(this.email);
  }

  private checkPassword(): boolean{
    return this.password.length >= 4 && this.password.length <= 20;
  }

  private openPopup(title: string, message: string) {
    this.popupComponent.title = title;
    this.popupComponent.message = message;
    this.popupComponent.displayStyle="block";
  }

  selectRole(role: RoleResponse){
    role.isSelected = !role.isSelected;
  }
}
