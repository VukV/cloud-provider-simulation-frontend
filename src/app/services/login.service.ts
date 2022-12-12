import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {LoginResponse} from "../model/responses/login-response";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = environment.loginUrl;

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any>{
    // return this.httpClient.post<LoginResponse>(this.loginUrl, {
    //   email: email,
    //   password: password
    // }).pipe(
    //   catchError(err => {
    //     console.log(err)
    //     return "greska";
    //   })
    // );

    return this.httpClient.post<LoginResponse>(this.loginUrl, {
      email: email,
      password: password
    });
  }
}
