import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {LoginResponse} from "../../model/responses/login-response";
import {PopupComponent} from "../popup/popup.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  email: string = "";
  password: string = "";
  emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private loginService: LoginService) { }

  ngAfterViewInit(): void {

    }

  ngOnInit(): void {
  }

  login(){
    if(this.checkEmail() && this.checkPassword()){
      console.log("usao if ", this.email, this.password);
      this.loginService.login(this.email, this.password).subscribe( (loginResponse: LoginResponse) => {
        console.log("STIGAO LOGIN");
        //localStorage.setItem("jwt", loginResponse.jwt);
      });
    }
    else {
      //todo
    }
  }

  private checkEmail(): boolean{
    return this.emailRegex.test(this.email);
  }

  private checkPassword(): boolean{
    return this.password.length > 4 && this.password.length < 20;
  }

  private openPopup() {
    this.popupComponent.message = "AAAAA";
    this.popupComponent.displayStyle="block";
  }

}
