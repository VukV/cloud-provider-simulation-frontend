import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {MessageResponse} from "../model/responses/message-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginUrl = environment.usersUrl;
  private headers = new HttpHeaders({
    'Authorization':'Bearer ' + localStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient) { }

  createUser(email: string, name: string, surname: string, password: string, roleIds: number[]): Observable<MessageResponse>{
    return this.httpClient.post<MessageResponse>(this.loginUrl,
      {
      email: email,
      password: password,
      name: name,
      surname: surname,
      roleIds: roleIds
    },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }
}
