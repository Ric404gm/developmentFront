import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BitacoraService } from 'src/app/services/bitacora/bitacora.service';
import { ProcessComentarioBitacora } from '../interfaces/comentarios-bitacora';

@Injectable({
  providedIn: 'root',
})
export class BitacoraComentariosSandBox {
  constructor(public bitacoraService: BitacoraService) {}

  add(bitacora: ProcessComentarioBitacora): Observable<any> {
    return this.bitacoraService.addBitacora(bitacora);
  }

  getInciativas() {
    return new Observable<Array<ProcessComentarioBitacora>>((observer: any) => {
      this.bitacoraService.consultarBitacora().subscribe((res) => {
        observer.next(res);
        observer.complete();
      });
    });
  }
}
