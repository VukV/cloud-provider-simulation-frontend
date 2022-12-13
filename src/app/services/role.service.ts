import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {RoleResponse} from "../model/responses/role-response";
import {LoginResponse} from "../model/responses/login-response";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private roleUrl = environment.roleUrl;
  private headers = new HttpHeaders({
    'Authorization':'Bearer ' + localStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<RoleResponse[]>{
    return this.httpClient.get<RoleResponse[]>(this.roleUrl, {
      headers: this.headers
    })
      .pipe(
        catchError(err => {
          return throwError(() => new Error(err.error.message));
        }));
  }
}
