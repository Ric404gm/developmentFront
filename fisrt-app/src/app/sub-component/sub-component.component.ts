import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalculadoraserviceService } from '../calculadoraservice.service';

@Component({
  selector: 'app-sub-component',
  templateUrl: './sub-component.component.html',
  styleUrls: ['./sub-component.component.css']
})
export class SubComponentComponent implements OnInit {
  
  protected  calculoResiduoMessage : string;

  @Input() public  mensajeAnySub ? : string ;

  @Input() public  valorCalculado: number ;
  
  @Output() calculoResiduoEvent = new EventEmitter<string> ();

  @Output() extraCalculoEvent = new EventEmitter<void> ();

  
  ngOnInit(): void {
      this._calculadora.setValor2(15);
  }

  constructor( private _calculadora :  CalculadoraserviceService ){
    this.valorCalculado = 0;
    this.calculoResiduoMessage = "El residuo con el dividendo 10 no es 0";
 
  }

  
  extraCalculoDelegateOperation(){
    this.extraCalculoEvent.emit();
  }




  calculoResiduio(){
    console.log(10 % this.valorCalculado);
    if( 10 % this.valorCalculado == 0){
        this.calculoResiduoMessage = " Residuo de con el divedendo 10 es 0";  
        this.calculoResiduoEvent.emit(this.calculoResiduoMessage);
    }
    else {
      this.calculoResiduoMessage = "El residuo con el dividendo 10 no es 0";
      this.calculoResiduoEvent.emit(this.calculoResiduoMessage);
    }
  }



}
