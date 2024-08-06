import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Products } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  prodMsg!: string;
  productForm!: any;
  constructor(private prodService: ProductService) { }

  ngOnInit() {
  }

  addProduct(data: Products) {
    console.log(data);
    this.prodService.addProducts(data).subscribe((res) => {
      console.log(res);
      this.prodMsg = "Product is successfully created!!";
    })
    setTimeout(() => {
      this.prodMsg = '';
    }, 3000)
  }
}
