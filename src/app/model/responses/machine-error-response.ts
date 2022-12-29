import {MachineActionEnum} from "../machine-action-enum";

export interface MachineErrorResponse{
  machineErrorId: number,
  errorDate: number,
  action: MachineActionEnum,
  message: string,
  machineId: number,
  machineName: string
}
