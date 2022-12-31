import {MachineStatusEnum} from "../machine-status-enum";

export interface MachineResponse{
  machineId: number,
  machineStatus: MachineStatusEnum,
  createdDate: number,
  name: string
}
