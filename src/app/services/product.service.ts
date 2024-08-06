import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Products, cart, orders } from '../data-type';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  addToCart =new EventEmitter<Products[] | []>();
  constructor(private http:HttpClient) { }

  addProducts(data:Products){
    console.log("service called")
    return this.http.post<Products[]>('http://localhost:3000/products',data);
  }

  productList()
  {
    return this.http.get<Products[]>('http://localhost:3000/products');
  }

  deleteProduct(id:any)
  {
    return this.http.delete<Products[]>(`http://localhost:3000/products/${id}`);
  }

  getProduct(id:any)
  {
    return this.http.get<Products>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(data:Products)
  {
    return this.http.put<Products>(`http://localhost:3000/products/${data.id}`,data);
  }
  popularProducts()
  {
    return this.http.get<Products[]>(`http://localhost:3000/products?_limit=8`);
  }
  trendyProducts()
  {
    return this.http.get<Products[]>(`http://localhost:3000/products?_limit=8`);
  }
  searchProducts(query:string)
  {
    return this.http.get<Products[]>(`http://localhost:3000/products?q=${query}`);
  }
  localAddToCart(data:Products)
  {
    let cartData=[];
    let localCart=localStorage.getItem('localCart');
    if(!localCart)
    {
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.addToCart.emit([data]);
    }else{
      cartData=JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.addToCart.emit(cartData);
    }
    
  }

  removeItemFromCart(productId:number)
  {
    let cartData=localStorage.getItem('localCart');
    if(cartData)
    {
      let items:Products[]=JSON.parse(cartData)
      items=items.filter((item:Products)=>productId!==item.id);
      localStorage.setItem('localCart',JSON.stringify(items));
      this.addToCart.emit(items);
    }
  }

  loginAddToCart(cartData:cart)
  {
   return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartToList(userId:number)
  {
   return this.http.get<Products[]>('http://localhost:3000/cart?userId='+userId,{observe:'response'})
   .subscribe((result)=>{
    if(result && result.body){
      this.addToCart.emit(result.body);
    }
   })
  }

  removeToCart(cardId:number)
  {
    return this.http.delete('http://localhost:3000/cart/'+cardId)
  }

  cartPageDetails()
  {
    let user=localStorage.getItem('user');
    let userData=user && JSON.parse(user);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id);
  }

  orderNow(data:orders)
  {
    return this.http.post('http://localhost:3000/orders',data);
  }

  orderList(){
    let user=localStorage.getItem('user');
    let userData=user && JSON.parse(user);
  return this.http.get<orders[]>('http://localhost:3000/orders?userId='+userData.id)
  }

  deleteItemsCart(cartId:number)
  {
    return this.http.delete('http://localhost:3000/cart/'+cartId,{observe:'response'})
    .subscribe((res)=>{
      if(res){
      this.addToCart.emit([]);
      }
    })
  }

  cancelOrder(orderId:number)
  {
    return this.http.delete('http://localhost:3000/orders/'+orderId);
  }
}
