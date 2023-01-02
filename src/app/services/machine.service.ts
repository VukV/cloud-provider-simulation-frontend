import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {MachineErrorResponse} from "../model/responses/machine-error-response";
import {MachineResponse} from "../model/responses/machine-response";
import {MachineStatusEnum} from "../model/machine-status-enum";
import {MachineActionEnum} from "../model/machine-action-enum";

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private machinesUrl = environment.machinesUrl;
  private headers = new HttpHeaders({
    'Authorization':'Bearer ' + localStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient) { }

  getMachines(machineName: string, statusList: MachineStatusEnum[], dateFrom: number, dateTo: number):Observable<MachineResponse[]>{
    let params = new HttpParams();
    if(machineName != ""){
      params = params.append("machineName", machineName);
      console.log("usao")
    }
    if(statusList.length > 0){
      params = params.append("statusList", statusList.toString());
    }
    if(dateFrom > -1 && dateTo > -1){
      params = params.append("dateFrom", dateFrom);
      params = params.append("dateTo", dateTo);
    }

    return this.httpClient.get<MachineResponse[]>(this.machinesUrl, {
      headers: this.headers,
      params: params
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    )
  }

  createMachine(machineName: string):Observable<MachineResponse>{
    return this.httpClient.post<MachineResponse>(this.machinesUrl,
      {},
      {
        headers: this.headers,
        params: {
          "machineName": machineName
        }
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  deleteMachine(machineId: number):Observable<any>{
    return this.httpClient.delete(this.machinesUrl + "/" + machineId, {
      headers: this.headers
    })
      .pipe(
        catchError(err => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  startAction(machineId: number, action: MachineActionEnum):Observable<any>{
    let url;
    switch (action){
      case MachineActionEnum.RESTART:
        url = "/restart/";
        break;
      case MachineActionEnum.START:
        url = "/start/";
        break;
      case MachineActionEnum.STOP:
        url = "/stop/";
        break;
      default:
        url = "/stop/";
    }

    return this.httpClient.post(this.machinesUrl + url + machineId, {}, {
      headers: this.headers
    })
      .pipe(
        catchError(err => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  getMachineErrors():Observable<MachineErrorResponse[]>{
    return this.httpClient.get<MachineErrorResponse[]>(
      this.machinesUrl + "/errors",
      {headers: this.headers})
      .pipe(
        catchError(err => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }
}
