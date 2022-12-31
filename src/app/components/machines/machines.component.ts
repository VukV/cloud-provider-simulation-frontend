import { Component, OnInit } from '@angular/core';
import {MachineService} from "../../services/machine.service";
import {UserService} from "../../services/user.service";
import {MachineResponse} from "../../model/responses/machine-response";
import {RoleEnum} from "../../model/role-enum";
import {MachineStatusEnum} from "../../model/machine-status-enum";

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  machines: MachineResponse[] = [];
  canCreate: boolean = false;
  canDestroy: boolean = false;
  canStart: boolean = false;
  canStop: boolean = false;
  canRestart: boolean = false;

  machineName: string = "";
  statusList: MachineStatusEnum[] = [];
  dateFrom: number = -1;
  dateTo: number = -1;

  constructor(private machineService: MachineService, private userService: UserService) { }

  ngOnInit(): void {
    this.getMachines();
    this.checkAllRoles();
  }

  checkAllRoles(){
    this.canCreate = this.userService.checkUserRole(RoleEnum.CREATE_MACHINES);
    this.canDestroy = this.userService.checkUserRole(RoleEnum.DESTROY_MACHINES);
    this.canStart = this.userService.checkUserRole(RoleEnum.START_MACHINES);
    this.canStop = this.userService.checkUserRole(RoleEnum.STOP_MACHINES);
    this.canRestart = this.userService.checkUserRole(RoleEnum.RESTART_MACHINES);
  }

  getMachines(){
    this.machineService.getMachines("", [], 1, 1);
    //todo
  }

}
