import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../popup/popup.component";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  email: string = "";
  name: string = "";
  surname: string = "";
  emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  //todo roles

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor() { }

  ngOnInit(): void {
  }

  createUser(){
    if(this.checkNameAndSurname() && this.checkEmail()){
      //todo post user
    }
    else {
      this.openPopup("Error!", "Invalid input.");
    }
  }

  private checkNameAndSurname(): boolean{
    return this.name != "" && this.surname != "";
  }

  private checkEmail(): boolean{
    return this.emailRegex.test(this.email);
  }

  private openPopup(title: string, message: string) {
    this.popupComponent.title = title;
    this.popupComponent.message = message;
    this.popupComponent.displayStyle="block";
  }
}
