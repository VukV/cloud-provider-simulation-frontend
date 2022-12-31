import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {MachineErrorResponse} from "../model/responses/machine-error-response";
import {MachineResponse} from "../model/responses/machine-response";
import {MachineStatusEnum} from "../model/machine-status-enum";

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
    //todo
    let searchUrl: string = "";

    return this.httpClient.get<MachineResponse[]>(searchUrl, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    )
  }

  getMachineErrors():Observable<MachineErrorResponse[]>{
    return this.httpClient.get<MachineErrorResponse[]>(
      this.machinesUrl + "/errors",
      {headers: this.headers});
  }
}
