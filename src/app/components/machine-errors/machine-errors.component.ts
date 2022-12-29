import { Component, OnInit } from '@angular/core';
import {MachineErrorResponse} from "../../model/responses/machine-error-response";
import {MachineService} from "../../services/machine.service";

@Component({
  selector: 'app-machine-errors',
  templateUrl: './machine-errors.component.html',
  styleUrls: ['./machine-errors.component.css']
})
export class MachineErrorsComponent implements OnInit {

  machineErrors: MachineErrorResponse[] = [];

  constructor(private machineService: MachineService) { }

  ngOnInit(): void {
    this.getMachineErrors();
  }

  getMachineErrors(){
    this.machineService.getMachineErrors().subscribe((errors) => {
      this.machineErrors = errors;
    })
  }

}
