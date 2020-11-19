import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  isAuth: boolean = false;
  isEmpty: boolean = false;
  warning: string = "";
  Register1: boolean = false;
  userRegisterData = {
    email: "",
    password: "",
    password2: "",
    fname: "",
    lname: "",
    street: ""
  };
  isLoading: boolean = true;
  display: string = "none";
  modalHeader: string = "";
  modalBody: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoading = false;
    this.authService.currentAuthStatus.subscribe(auth => (this.isAuth = auth));
  }

  onStageOneComplete(form1: NgForm) {
    if (!form1.valid) {
      this.isEmpty = true;
      this.warning = "Please fill all required fields";
    }
    if (
      form1.controls.password.value !== form1.controls.password2.value &&
      form1.controls.password &&
      form1.controls.password2
    ) {
      this.isEmpty = true;
      this.warning = "Passwords do not match";
    }
    if (form1.controls.password.value == form1.controls.password2.value && form1.valid) {
      this.isEmpty = false;
      this.Register1 = true;
      this.userRegisterData = {
        ...this.userRegisterData,
        email: form1.controls.email.value,
        password: form1.controls.password.value,
        password2: form1.controls.password2.value
      };
    }
  }



  onRegisterUser(form2: NgForm) {
    if (!form2.valid) {
      this.isEmpty = true;
      this.warning = "Please fill all required fields";
    } else {
      this.isLoading = true;
      this.isEmpty = false;
      this.userRegisterData = {
        ...this.userRegisterData,
        fname: form2.controls.fname.value,
        lname: form2.controls.lname.value,
        street: form2.controls.street.value
      };
      this.authService.registerUser(this.userRegisterData).subscribe(
        user => {
          this.isLoading = false;
          this.isEmpty = false;
          this.router.navigate(["/login"]);
        },
        err => {
          this.isLoading = false;
          if (err.status) {
            this.isEmpty = true;
            this.warning = "Could not register user";
            this.router.navigate(["/register"]);
          } else this.onError();
        }
      );
    }
  }

  // modal
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  onError() {
    this.modalHeader = "An Error Has Occurred";
    this.modalBody = "Could not register user do to server communication problem. Please try again later.";
    this.openModal();
  }
}
