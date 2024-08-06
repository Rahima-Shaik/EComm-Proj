import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Products } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType!:string;
  sellerName!:string;
  userName:string="";
  searchResult!:Products[] | undefined;
  cartItems=0;


  constructor(private route:Router, private prodService:ProductService){}
 
  ngOnInit()
  {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        // console.warn(val.url);
        if(localStorage.getItem('seller') && val.url.includes('seller'))
        {
          // console.log("in seller area");
          this.menuType="seller";
          let sellerStore=localStorage.getItem('seller');
          let sellerData= sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName=sellerData.name;
        }
        else if(localStorage.getItem('user'))
        {
          this.menuType="user";
          let userStore=localStorage.getItem('user');
          let userData=userStore && JSON.parse(userStore);
          this.userName=userData.name;
          this.prodService.getCartToList(userData.id)
        }
        else{
          // console.log("outside seller area");
          this.menuType="default";
        }
      } 
    });
    let cartData=localStorage.getItem('localCart');
    if(cartData){
    this.cartItems=JSON.parse(cartData)?.length;
    }
    this.prodService.addToCart.subscribe((items)=>{
       this.cartItems=items.length;
    })
  }
 
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
    this.prodService.addToCart.emit([]);
  }

  logoutUser(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }

  searchProduct(query:KeyboardEvent){
  if(query){
    const element=query.target as HTMLInputElement;
    // console.log(element.value);
    this.prodService.searchProducts(element.value).subscribe((result)=>{
    //  console.log(result);

     if(result.length>5)
     {
      result.length=5;
     }
     this.searchResult=result;
    })
  }
  }

  hideSearch(){
    this.searchResult=undefined;
  }

  onSearch(val:string)
  {
    console.log(val);
    this.route.navigate([`search/${val}`]);
   
  }
  redirectToDetails(id:number)
  {
    this.route.navigate(['/details/'+id])
  }
}

