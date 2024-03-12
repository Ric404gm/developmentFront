import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  Product, productsList} from '../products/products.mock';

@Component({
  selector: 'app-product-detail-component-byid',
  templateUrl: './product-detail-component-byid.component.html',
  styleUrls: ['./product-detail-component-byid.component.css']
})
export class ProductDetailComponentByidComponent implements OnInit {

  protected idDetailProduct ? : number;
  protected productsListMock :  Product [] =productsList;
  protected productMock ?:  Product ; 
  protected loading : boolean = true;

  protected offerColorStyle  : string  = '';
  constructor (private  _activeRouting: ActivatedRoute ){
        
  }
  ngOnInit(): void {
    
    setTimeout(() => {
      this._activeRouting.params.subscribe(  params => {
        this.idDetailProduct = params['id'];
        this.productMock =  this.productsListMock?.find((item)  => item.id ==  this.idDetailProduct); 
        console.log(this.productMock);
        this.offerColorStyle  = this.productMock!.price  <=40 ? 'orangered': '';  
        this.loading = false; 
      });
    }, 1500);
  }

  /** code without Loging
   * 
   * ngOnInit(): void {
      this._activeRouting.params.subscribe(  params => {
        this.idDetailProduct = params['id'];
        this.productMock =  this.productsListMock?.find((item)  => item.id ==  this.idDetailProduct); 
        console.log(this.productMock); 
      });

  }
   */
}
