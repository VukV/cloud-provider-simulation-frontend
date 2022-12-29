import { Component, OnInit } from '@angular/core';
import {MachineService} from "../../services/machine.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  //todo machines list
  canCreate: boolean = false;
  canDestroy: boolean = false;
  canStart: boolean = false;
  canStop: boolean = false;
  canRestart: boolean = false;

  constructor(private machineService: MachineService, private userService: UserService) { }

  ngOnInit(): void {
    //todo get machines
    //todo get roles (boolean)
  }

}
