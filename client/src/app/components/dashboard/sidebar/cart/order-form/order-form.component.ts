import { Component, OnInit, Input } from "@angular/core";
import * as jsPDF from "jspdf";
// Services
import { OrderService } from "src/app/services/order.service";
import { AuthService } from "src/app/services/auth.service";
// Models
import { User } from "src/app/models/User";
import { Order } from "src/app/models/Order";

@Component({
  selector: "app-order-form",
  templateUrl: "./order-form.component.html",
  styleUrls: ["./order-form.component.css"]
})
export class OrderFormComponent implements OnInit {
  @Input() user: User;
  orders: Order[];
  count = 0;
  last = "";
  currentDate: string = "";
  isEmpty: boolean = false;
  warning: string = "";
  // modal & loading
  isLoading: boolean = true;
  display: string = "none";
  modalHeader: string = "";
  modalBody: string = "";

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit() {
    this.currentDate = this.getCurrentDate(new Date());
    this.isLoading = false;
  }

  onFinalizeOrder(form) {
    this.isEmpty = false;
    if (!form.valid ) 
    {
      this.isEmpty = true;
      this.warning = "Please fill out all the required fields";
      if (form.valid)
        this.warning = "Credit card number is invalid";
      this.display = "none";
    } else {
      this.isLoading = true;
      this.orderService.getAllOrders().subscribe(
        res => {
          this.isLoading = false;
          let 
            isTaken = false,
            orders = res.orders;
          if (orders) {
            if (isTaken) {
              this.isEmpty = true;
              this.display = "none";
            } else
              this.orderService
                .addOrder(this.user,{
                  street: form.controls.street.value,
                  credit: form.controls.credit.value
                })
                .subscribe(
                  res => {
                    this.authService.userDetails(res.user);
                    console.log("finalize order part 1");
                    this.authService.currentUserData.subscribe(
                      user => ((this.user = user), form.reset(), this.openModal()),
                      err => this.onError()
                    );
                  },
                  err => this.onError()
                );
          }
        },
        err => this.onError()
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
  getCurrentDate = date => {
    let today = new Date(date),
      current = today.getFullYear().toString();
    if (today.getMonth() + 1 < 10) current += "-0" + (today.getMonth() + 1);
    else current += "-" + (today.getMonth() + 1);
    if (today.getDate() < 10) current += "-0" + today.getDate();
    else current += "-" + today.getDate();
    return current;
  };
  adjustDate = date => {
    let correct = date.slice(-2) + "/" + date.slice(5, -3) + "/" + date.slice(0, 4);
    return correct;
  };

  onError() {
    this.modalHeader = "An Error Has Occurred";
    this.modalBody = "Could not process your order due to server communication problem. Please try again later.";
    this.openModal();
  }
}
