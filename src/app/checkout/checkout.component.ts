import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Products, cart, orders } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg:string | undefined;

  constructor(private prod: ProductService, private router: Router) { }

  ngOnInit() {

    this.prod.cartPageDetails().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          let numValue = Number(item.price * (+item.quantity));
          price = price + numValue;
        }
      });
      this.totalPrice = price + (price / 10) + 100 - (price / 5);
      console.warn(this.totalPrice);
    })

  }

  orderNow(data: orders) {
    console.log(data);
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData: orders = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.prod.deleteItemsCart(item.id);
        },700);
      })

      this.prod.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg="Your Order has been placed";
          setTimeout(()=>{
            this.router.navigate(['/my-orders'])
            this.orderMsg=undefined
          },4000)
        }
      })
    }
  }
}
