import { Component, OnInit } from '@angular/core';
import { RefrescoserviceService } from '../service/refrescoservice.service';

@Component({
  selector: 'app-pepsi',
  templateUrl: './pepsi.component.html',
  styleUrls: ['./pepsi.component.css']
})
export class PepsiComponent implements OnInit{

  protected tipoRefresco : string = '';
  protected color : string = "blue";
  protected precio : number = 14;
  
  
  constructor(private _refrescoService :  RefrescoserviceService){

  }


  ngOnInit(): void {
    this._refrescoService.setPepsi(" pecsi ");
    this.tipoRefresco = this._refrescoService.getPepsi();           
  }

  
  mensaje(){
    console.log( `soy mejor que   ${this._refrescoService.getCoca()}`  );
  }


}
