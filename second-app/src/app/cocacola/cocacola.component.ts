import { Component, OnInit,inject } from '@angular/core';
import { RefrescoserviceService } from '../service/refrescoservice.service';

@Component({
  selector: 'app-cocacola',
  templateUrl: './cocacola.component.html',
  styleUrls: ['./cocacola.component.css']
})
export class CocacolaComponent implements OnInit{

  private _refrescoService = inject(  RefrescoserviceService);

  protected tipoRefresco : string = '';
  protected color : string = "black";
  protected precio : number = 10;
  
  constructor(){
  }

  ngOnInit(): void {
    this._refrescoService.setCoca(" cocita ");
    this.tipoRefresco = this._refrescoService.getCoca();      
  }

  mensaje(){
    console.log( `soy mejor que   ${this._refrescoService.getPepsi()}`  );
  }

}
