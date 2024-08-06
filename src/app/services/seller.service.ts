
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  public isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError =new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) 
  { 

  }
  
  userSignup(data: SignUp) {
    console.log("service called");
    this.http.post('http://localhost:3000/seller', data,
    {observe:'response'}
    ).subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
      console.log(result);
    });
  }

  reloadSeller()
  {
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data:Login)
  {
    console.log(data)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}
    ).subscribe((result:any)=>{
     console.warn(result);
     if(result && result.body && result.body.length)
     {
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
     }
     else{
     console.log("user failed");
     this.isLoginError.emit(true);
     }
    })
  }
}
