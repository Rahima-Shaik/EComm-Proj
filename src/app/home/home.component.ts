import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Products } from '../data-type';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  popularProduct!:Products[];
  trendyProducts!:Products[];

  constructor(private prodService:ProductService){}

  ngOnInit()
  {
    this.prodService.popularProducts().subscribe((data)=>{
    //  console.log(data);
     this.popularProduct=data;
    })
    this.prodService.trendyProducts().subscribe((data)=>{
    //  console.log(data);
     this.trendyProducts=data;
    })
  }
}



















  

