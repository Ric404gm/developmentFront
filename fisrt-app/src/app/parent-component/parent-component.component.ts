import { Component, OnInit } from '@angular/core';
import { CalculadoraserviceService } from '../calculadoraservice.service';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrls: ['./parent-component.component.css']
})
export class ParentComponentComponent implements OnInit  {

  protected counter: number=0;
  protected calculoResiduoMessage : string ="   " ;
  protected  anyMensaje : string; 


  
  constructor(private _calculadora :  CalculadoraserviceService){
    this.anyMensaje = " * O OK *";
  }

  ngOnInit(): void {
      this._calculadora.setValor1(10);
  }

  incrementar (){
    this.counter++;
  }

   decrementar (){
    
    this.counter--;
  }

  onCalculoResiduo(mensaje : string ){
    this.calculoResiduoMessage = mensaje;
  }

  onExtraCalculate(){
      this.counter ++;    
  }
   

}
