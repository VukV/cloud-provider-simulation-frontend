import {Component, OnInit, ViewChild} from '@angular/core';
import {UserResponse} from "../../model/responses/user-response";
import {PopupComponent} from "../popup/popup.component";
import {UserService} from "../../services/user.service";
import {RoleResponse} from "../../model/responses/role-response";
import {RoleEnum} from "../../model/role-enum";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UserResponse[] = []
  canDelete: boolean = false;
  canUpdate: boolean = false;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    this.canDelete = this.userService.checkUserRole(RoleEnum.DELETE);
    this.canUpdate = this.userService.checkUserRole(RoleEnum.UPDATE);
  }

  getUsers(){
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    }, error => {
      this.openPopup("Error!", error.message);
    });
  }

  private openPopup(title: string, message: string) {
    this.popupComponent.title = title;
    this.popupComponent.message = message;
    this.popupComponent.displayStyle="block";
  }

  printRoles(roles: RoleResponse[]): string{
    let roleNames = roles.map(role => {return role.role});
    if(roleNames.length > 1){
      return roleNames.toString().slice(0, 10).concat("...");
    }
    return roleNames.toString().slice(0, 25);
  }

}
