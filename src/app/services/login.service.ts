import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {LoginResponse} from "../model/responses/login-response";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = environment.loginUrl;

  private loggedInBehavior = new BehaviorSubject(this.getLoginStatus());
  isLoggedIn = this.loggedInBehavior.asObservable();

  constructor(private httpClient: HttpClient) { }

  setLoggedInBehavior(loggedIn: boolean){
    this.loggedInBehavior.next(loggedIn);
  }

  login(email: string, password: string): Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(this.loginUrl, {
      email: email,
      password: password
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  private getLoginStatus(): boolean{
    return !!localStorage.getItem("jwt");
  }



}
