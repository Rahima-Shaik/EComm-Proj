import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Products, Summary, cart } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartData: cart[] | undefined;
  priceSummary: Summary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(private prod: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadDetails();
  }

  checkout() {
    this.router.navigate(['/checkout'])
  }

  removeCart(id: number | undefined) {
    id && this.prod.removeToCart(id).subscribe((res) => {
      if (res) {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        this.prod.getCartToList(userId);
      }
      this.loadDetails();
    })
  }

  loadDetails() {
    this.prod.cartPageDetails().subscribe((result) => {
      console.log(result);
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          let numValue = Number(item.price * (+item.quantity));
          price = price + numValue;
        }
      });

      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 5;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 5);
      console.warn(this.priceSummary);

      if(this.cartData?.length===0)
      {
        this.router.navigate(['/']);
      }
    })
 
  }
}
