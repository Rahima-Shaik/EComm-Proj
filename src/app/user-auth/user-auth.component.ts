import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Login, Products, cart } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin = false;
  loginerror: string = "";

  constructor(private user: UsersService, private prod: ProductService) {
  }

  ngOnInit() {
    this.user.userAuthReload();
  }

  onSignup(data: any) {
    this.user.userSignUp(data);
  }

  onLogin(data: Login) {
    // console.warn(data);
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.loginerror = "Please enter valid user details";
      }
      else {
        setTimeout(()=>{
          this.localCartToRemoteCart();
        },300);
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');  
    let userValue = localStorage.getItem('user');
    let userId= userValue && JSON.parse(userValue).id;
    if (data) {
       console.log(userId)
      let cardDataList: Products[] = JSON.parse(data);
      cardDataList.forEach((product: Products, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };

        delete cartData.id;
        setTimeout(() => {
          this.prod.loginAddToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("Item stored in DB");
            }
          })
        }, 500);
        if (cardDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }
     setTimeout(()=>{
      this.prod.getCartToList(userId);
     })
  }
}


