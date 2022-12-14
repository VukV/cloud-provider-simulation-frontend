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
  user!: UserResponse;

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
      this.user = user;
    },error => {
      this.openPopup("Error!", error.message);
    });
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

}
