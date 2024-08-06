import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, orders } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orderData:orders[] | undefined;

  constructor(private prod:ProductService){

  }

  ngOnInit():void
  {
    this.getOrderList();
  }

  cancelOrder(orderId:number|undefined)
  {
    orderId && this.prod.cancelOrder(orderId).subscribe((res)=>{
    this.getOrderList();
    })
  }

  getOrderList()
  {
    this.prod.orderList().subscribe((result)=>{
      this.orderData=result
     })
  }
}