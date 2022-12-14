import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../services/role.service";
import {RoleResponse} from "../../model/responses/role-response";
import {PopupComponent} from "../popup/popup.component";
import {UserService} from "../../services/user.service";
import {UserResponse} from "../../model/responses/user-response";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  private userId: number = -1;
  roles: RoleResponse[] = [];
  name: string = "";
  surname: string = "";
  email: string = "";

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private roleService: RoleService, private userService: UserService) { }

  ngOnInit(): void {
    this.getRoles();
    this.activatedRoute.params.subscribe(params => {
      this.userId = +params['userId'];
      this.getUser();
    })
  }

  private getUser(){
    this.userService.getUser(this.userId).subscribe((user) => {
      this.setUser(user);
    },error => {
      this.openPopup("Error!", error.message);
    });
  }

  private setUser(user: UserResponse){
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.setupRoles(user);
  }

  updateUser(){
    //todo put user
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

  private setupRoles(user: UserResponse){
    for(let r of this.roles){
      for(let userRole of user.roles){
        if(r.roleId == userRole.roleId){
          let button = document.getElementById('role-button-' + r.roleId);
          if(button) {
            button.click();
          }
          break;
        }
      }
    }
  }

  selectRole(role: RoleResponse){
    role.isSelected = !role.isSelected;
  }

  private getRoleIds(): number[]{
    let roleIds: number[] = [];
    for(let role of this.roles){
      if(role.isSelected){
        roleIds.push(role.roleId);
      }
    }
    return roleIds;
  }

  private openPopup(title: string, message: string) {
    this.popupComponent.title = title;
    this.popupComponent.message = message;
    this.popupComponent.displayStyle="block";
  }

  cancelUpdate(){
    this.router.navigate(['/users']);
  }

}
