import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCambiacolorletra]'
})
export class CambiacolorletraDirective  implements OnInit{

  @Input() valueColor ?: string ;

  constructor(private elementItem: ElementRef ) {
    console.log("carga constructor",this.valueColor )
   }

   ngOnInit(): void {
      console.log(" Carga on init",this.valueColor ); 
      this.elementItem.nativeElement.style.backgroundColor= this.valueColor;
   }

}
