import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import{ Login, SignUp } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  constructor(private seller:SellerService,private router:Router){}
  showLogin=false;
  loginerror!: String;
  ngOnInit(){
    this.seller.reloadSeller()
  }

  onSignup(data:SignUp):void{
    this.seller.userSignup(data);
  }

  onLogin(data:Login){
    this.loginerror="";
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((error)=>{
      if(error){
        this.loginerror="Enter correct Email or Password"
      }
    })
  }

  openLogin()
  {
    this.showLogin=true;
  }
  openSignup()
  {
    this.showLogin=false;
  }
}
