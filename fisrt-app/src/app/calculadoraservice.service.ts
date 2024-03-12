import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraserviceService {

  valor1 ?: number ;   
  valor2 ?: number ; 

  constructor() { }

  sumar(valor3 : number ){

    console.log(` Valor Ingresado al Service ${valor3}`);
  }

  mensajeIngresaValor(): string {
    return  " Ingresa  valor";
  }


  getValor1 ():number {
    return this.valor1 || 0;
  }

  
  getValor2 ():number {
    return this.valor2 || 0;
  }


  setValor1(valor1 :  number){
    this.valor1 = valor1;
  }

  
  setValor2(valor2 :  number){
    this.valor2 = valor2;
  }
}
