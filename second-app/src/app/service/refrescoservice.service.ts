import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefrescoserviceService {

  private  pepsi ? : string;
  private  coca ? : string;

  

  getPepsi():string {
    return this.pepsi ||  '';
  }

  setPepsi(pepsi: string):void {
    this.pepsi = pepsi ;
  }

  
  getCoca():string {
    return this.coca ||  '';
  }

  setCoca(coca: string):void {
    this.coca = coca ;
  }




}
