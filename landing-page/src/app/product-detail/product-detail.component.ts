import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  protected  producto? : string ;
  protected precio? : number ;

  constructor(private _route: ActivatedRoute){

  }

  ngOnInit(): void {  
    
    this._route.params.subscribe( params => {
        console.log("Parametros recibido ", params);
        console.log("Parametro recibido ", params['id']);
        this.producto = params['id'];
        this.precio = params['precio']
    }); 
      
  }
}