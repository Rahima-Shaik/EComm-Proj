import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  invalidUserAuth=new EventEmitter<boolean>(false);

  constructor(private http:HttpClient, private router:Router) { }

  userSignUp(user:SignUp)
  {
   this.http.post("http://localhost:3000/users",user,{observe:'response'})
   .subscribe((res)=>{
    if(res)
    {
      // console.warn(res);
      localStorage.setItem('user',JSON.stringify(res.body));
      this.router.navigate(['/']);
    }
   })
  }

  userLogin(data:Login)
  {
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'})
    .subscribe((result:any)=>{
      if(result && result.body && result.body.length)
      {
      // console.log(result);
      this.invalidUserAuth.emit(false);
      localStorage.setItem('user',JSON.stringify(result.body[0]));
      let user=localStorage.getItem('user');
      console.log(user);
      this.router.navigate(['/']);
      }
      else
      {
        this.invalidUserAuth.emit(true);
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user'))
    {
      this.router.navigate(['/'])
    }
  }
}
