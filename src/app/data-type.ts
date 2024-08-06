export interface SignUp
{
  name:string,
  email:string,
  password:string
}

export interface Login
{
  id:number,
  email:string,
  password:string
}

export interface Products{
  productId: number | undefined;
  name:string,
  price:number,
  color:string,
  category:string,
  image:string,
  description:string,
  id:number,
  quantity:undefined | number;
}

export interface cart{
  name:string,
  price:number,
  color:string,
  category:string,
  image:string,
  description:string,
  id?:number,
  quantity:undefined | number;
  productId:number,
  userId:number
}
export interface Summary{
  price:number,
  discount:number,
  tax:number,
  delivery:number,
  total:number

}
export interface orders{
  email:string,
  address:string,
  contact:string,
  totalPrice:number,
  userId:number,
  id:number | undefined
}