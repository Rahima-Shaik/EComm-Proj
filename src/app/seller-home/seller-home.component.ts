import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Products } from '../data-type';
import {faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList!: Products[];
  deleteItem!:string;

  Icon=faTrash;
  editIcon=faEdit;

  constructor(private prodService: ProductService) {

  }
  ngOnInit() {
    this.list();
  }

  ondelete(i: any) {
    console.log(i);
    this.prodService.deleteProduct(i).subscribe((res) => {
      if(res){
        this.deleteItem="Product is deleted successfully";
      }
      this.list();
    });
  }

  list() {
    this.prodService.productList().subscribe((res) => {
      console.log(res);
      this.productList = res;
    })
  }

  onEdit(i:any)
  {
   
  }
}
