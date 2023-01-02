import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {MachineErrorResponse} from "../model/responses/machine-error-response";
import {MachineResponse} from "../model/responses/machine-response";
import {MachineStatusEnum} from "../model/machine-status-enum";
import {MessageResponse} from "../model/responses/message-response";

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
      params.set("machineName", machineName);
    }
    if(statusList.length > 0){
      params.set("statusList", statusList.toString());
    }
    if(dateFrom > -1 && dateTo > -1){
      params.set("dateFrom", dateFrom);
      params.set("dateTo", dateTo);
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

  getMachineErrors():Observable<MachineErrorResponse[]>{
    return this.httpClient.get<MachineErrorResponse[]>(
      this.machinesUrl + "/errors",
      {headers: this.headers});
  }
}
