import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Products } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
 searchResult:undefined|Products[];

  constructor(private route:ActivatedRoute,private prod:ProductService){}

  ngOnInit()
  {
    let query=this.route.snapshot.paramMap.get('query');
   // console.log(query);
    query && this.prod.searchProducts(query).subscribe((data)=>{
    this.searchResult=data;
    })
  } 
}
