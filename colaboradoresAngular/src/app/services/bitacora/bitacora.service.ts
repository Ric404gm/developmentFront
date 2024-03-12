import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProcessComentarioBitacora } from 'src/app/shared/interfaces/comentarios-bitacora';

@Injectable({
  providedIn: 'root',
})
export class BitacoraService {
  private url = 'http://localhost:8080/gestor-app';

  constructor(private httpclient: HttpClient) {}

  addBitacora(bitacora: ProcessComentarioBitacora): Observable<any> {
    return this.httpclient.post(`${this.url}/bitacora/agregar`, bitacora);
  }

  consultarBitacora(): Observable<String> {
    return this.httpclient.get<any>(`${this.url}/bitacora/obtener`).pipe(
      map((data: any) => {
        return data.resultados;
      })
    );
  }
}
