import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  productsList} from '../products/products.mock';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  protected  productosDataList : any ; 
  
  constructor(){
    this.productosDataList = productsList;
  }

}
