import {Component, OnInit, ViewChild} from '@angular/core';
import {MachineService} from "../../services/machine.service";
import {UserService} from "../../services/user.service";
import {MachineResponse} from "../../model/responses/machine-response";
import {RoleEnum} from "../../model/role-enum";
import {MachineStatusEnum} from "../../model/machine-status-enum";
import {PopupComponent} from "../popup/popup.component";
import {MachineActionEnum} from "../../model/machine-action-enum";
import {CompatClient, Stomp} from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

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

  createMachineName: string = "";

  // @ts-ignore
  stompClient: CompatClient;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private machineService: MachineService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getMachines();
    this.checkAllRoles();
    this.connectToSocket();
  }

  checkAllRoles(){
    this.canCreate = this.userService.checkUserRole(RoleEnum.CREATE_MACHINES);
    this.canDestroy = this.userService.checkUserRole(RoleEnum.DESTROY_MACHINES);
    this.canStart = this.userService.checkUserRole(RoleEnum.START_MACHINES);
    this.canStop = this.userService.checkUserRole(RoleEnum.STOP_MACHINES);
    this.canRestart = this.userService.checkUserRole(RoleEnum.RESTART_MACHINES);
  }

  getMachines(){
    this.machineService.getMachines(this.machineName, this.statusList, this.dateFrom, this.dateTo).subscribe({
      complete: () => {
        this.statusList = [];
        this.dateTo = -1;
        this.dateFrom = -1;
        this.machineName = "";
        this.clearChecked();
      },
      error: (error) => {
        this.openPopup("Error!", error.message);
      },
      next: (machines) => {
        this.machines = machines;
      }
    });
  }

  searchMachines(){
    let stopped = document.getElementById('stopped-check') as HTMLInputElement;
    let running = document.getElementById('running-check') as HTMLInputElement;
    if(stopped.checked){
      this.statusList.push(MachineStatusEnum.STOPPED);
    }
    if(running.checked){
      this.statusList.push(MachineStatusEnum.RUNNING);
    }

    let dateFrom = document.getElementById('date-from') as HTMLInputElement;
    let dateTo = document.getElementById('date-to') as HTMLInputElement;
    if(dateTo.value || dateFrom.value){
      if(!isNaN(dateFrom.valueAsNumber) && !isNaN(dateTo.valueAsNumber)){
        this.dateFrom = dateFrom.valueAsNumber / 1000;
        this.dateTo = dateTo.valueAsNumber / 1000;
      }
      else {
        this.openPopup("Error!", "Both dates must be selected.");
      }
    }

    this.getMachines();
  }

  createMachine(){
    this.machineService.createMachine(this.createMachineName).subscribe({
      complete: () => {
        this.createMachineName = ""
      },
      error: (error) => {
        this.openPopup("Error!", error.message);
      },
      next: (machine) => {
        this.machines.push(machine);
      }
    });
  }

  deleteMachine(machineId: number){
    this.machineService.deleteMachine(machineId).subscribe({
      complete : () => {},
      error: (error) => {
        this.openPopup("Error!", error.message);
      },
      next: () => {
        for(let i = 0; i < this.machines.length; i++){
          if(this.machines[i].machineId == machineId){
            this.machines.splice(i, 1);
            break;
          }
        }
      }
    });
  }

  startMachine(machineId: number){
    this.machineService.startAction(machineId, MachineActionEnum.START).subscribe({
      complete: () => {
      },
      error: (error) => {
        this.openPopup("Error!", error.message);
      },
      next: () => {
      }
    });
  }

  stopMachine(machineId: number){
    this.machineService.startAction(machineId, MachineActionEnum.STOP).subscribe({
      complete: () => {
      },
      error: (error) => {
        this.openPopup("Error!", error.message);
      },
      next: () => {
      }
    });
  }

  restartMachine(machineId: number){
    this.machineService.startAction(machineId, MachineActionEnum.RESTART).subscribe({
      complete: () => {
      },
      error: (error) => {
        this.openPopup("Error!", error.message);
      },
      next: () => {
      }
    });
  }

  connectToSocket(){
    let jwt = localStorage.getItem("jwt");
    const socket = new SockJS(environment.wsUrl + "?jwt=" + jwt);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, this.onConnect.bind(this));
  }

  onConnect(){
    let email = this.userService.getUserEmail();
    if(email != null){
      this.stompClient.subscribe('/topic/' + email, this.changeMachines.bind(this));
    }
  }

  changeMachines(machineMessage: any){
    let machine = JSON.parse(machineMessage.body);
    for(let m of this.machines){
      if(m.machineId == machine.machineId){
        m.machineStatus = machine.machineStatus;
      }
    }
  }

  isStopped(status: MachineStatusEnum):boolean{
    return status == MachineStatusEnum.STOPPED;
  }

  private openPopup(title: string, message: string) {
    this.popupComponent.title = title;
    this.popupComponent.message = message;
    this.popupComponent.displayStyle="block";
  }

  private clearChecked(){
    let stopped = document.getElementById('stopped-check') as HTMLInputElement;
    let running = document.getElementById('running-check') as HTMLInputElement;

    stopped.checked = false;
    running.checked = false;
  }

  openSchedule(machineId: number, machineName: string){
    this.router.navigate(['/schedule', machineId, machineName]);
  }
}
