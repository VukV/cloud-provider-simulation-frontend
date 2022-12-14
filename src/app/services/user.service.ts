import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {MessageResponse} from "../model/responses/message-response";
import {UserResponse} from "../model/responses/user-response";
import jwtDecode from "jwt-decode";
import {TokenPayload} from "../model/token-payload";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = environment.usersUrl;
  private headers = new HttpHeaders({
    'Authorization':'Bearer ' + localStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient) { }

  checkUserRole(role: string): boolean{
    let token = localStorage.getItem("jwt");
    if(token == null){
      return false;
    }

    let decoded = jwtDecode<TokenPayload>(token);
    return decoded.roles.includes(role);
  }

  getAllUsers():Observable<UserResponse[]>{
    return this.httpClient.get<UserResponse[]>(this.usersUrl, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    )
  }

  createUser(email: string, name: string, surname: string, password: string, roleIds: number[]): Observable<MessageResponse>{
    return this.httpClient.post<MessageResponse>(this.usersUrl,
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

  deleteUser(userId: number):Observable<MessageResponse>{
    return this.httpClient.delete<MessageResponse>(this.usersUrl + "/" + userId, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }
}
