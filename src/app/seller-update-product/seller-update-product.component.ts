import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Products } from '../data-type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productData!: Products | undefined;
  prodMsg!: string;
  data: number | undefined;
  constructor(private prodService: ProductService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.prodService.getProduct(productId).subscribe((res) => {
      console.log(res);
      this.productData = res;
    })
  }


  updateProduct(data: Products) {
    if (this.productData) {
      data.id = this.productData.id;
      this.prodService.updateProduct(data).subscribe((res) => {
        console.log(res);
        this.prodMsg = "Product has been updated",
        setTimeout(() => {
          this.prodMsg ='',
          this.router.navigate(['/seller-home'])
        }, 1000)
      });
    }
  }
}
