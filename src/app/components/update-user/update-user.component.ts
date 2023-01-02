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

  emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private roleService: RoleService, private userService: UserService) { }

  ngOnInit(): void {
    this.getRoles();
    this.activatedRoute.params.subscribe(params => {
      this.userId = +params['userId'];
      this.getUser();
    });
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
    if(this.checkNameAndSurname() && this.checkEmail()){
      this.userService.updateUser(this.userId, this.email, this.name, this.surname, this.getRoleIds()).subscribe(() => {
        this.goToUsersPage();
      }, error => {
        this.openPopup("Error!", error.message);
      });
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

  goToUsersPage(){
    this.router.navigate(['/users']);
  }

  private checkNameAndSurname(): boolean{
    return this.name != "" && this.surname != "";
  }

  private checkEmail(): boolean{
    return this.emailRegex.test(this.email);
  }

}
