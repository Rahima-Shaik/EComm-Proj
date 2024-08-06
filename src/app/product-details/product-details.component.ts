import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Products, cart } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData: undefined | Products;
  count: number = 1;
  removeCart = false;
  cartData:undefined | Products;

  constructor(private activateRoute: ActivatedRoute, private prod: ProductService) {
  }

  ngOnInit() {
    let productId = this.activateRoute.snapshot.paramMap.get('productId')
    console.warn(productId);
    productId && this.prod.getProduct(productId).subscribe((res) => {
      console.log(res);
      this.productData = res;


      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: Products) => productId == item.id.toString())
        if (items.length) {
          this.removeCart = true;
        }
        else {
          this.removeCart = false;
        }
      }

      let user=localStorage.getItem('user');
      if(user)
      {
        let userId=user && JSON.parse(user).id;
        this.prod.getCartToList(userId);
        this.prod.addToCart.subscribe((result)=>{
          let item=result.filter((item:Products)=>productId?.toString()=== item.productId?.toString())
          if(item.length)
          {
            this.cartData=item[0];
            this.removeCart = true;
          }
        })
      }

    })
  }

  onAdd() {
    this.count++;
    console.warn(this.count);
  }
  byRemove() {
    this.count--;
    console.warn(this.count);
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.count;
      if (!localStorage.getItem('user')) {
        this.prod.localAddToCart(this.productData);
        this.removeCart = true;
      }
      else {
        // console.warn('user logged in')
        let user=localStorage.getItem('user');
        let userId=user && JSON.parse(user).id;
        // console.log(userId);

        let cartData:cart={
          ...this.productData,
          userId,
          productId:this.productData.id
        }
       delete cartData.id;
        // console.warn(cartData);
        this.prod.loginAddToCart(cartData).subscribe((result)=>{
          if(result)
          {
            this.prod.getCartToList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }

  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
    this.prod.removeItemFromCart(productId);
    }
    else{
      let user=localStorage.getItem('user');
      let userId=user && JSON.parse(user).id;
      console.warn(this.cartData);
      this.cartData && this.prod.removeToCart(this.cartData.id).subscribe((res)=>{
      if(res)
      {
        this.prod.getCartToList(userId);
      }
      })
    }
    this.removeCart = false;
  }
}
