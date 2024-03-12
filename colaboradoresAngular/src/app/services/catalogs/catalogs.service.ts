
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoGestor } from 'src/app/shared/interfaces/catalog-interface';
import { map } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class CatalogsService {

  
  private url = "http://localhost:8080/gestor-app/catalogos/consultar";

  constructor(private httpclient: HttpClient) {}

  obtenerCatalogo(catalogo : string ): Observable<Array<CatalogoGestor>>{
    return  this.httpclient.get<any>(`${this.url}/${catalogo}`)
     .pipe(
       map((data: any ) => {
       return data.resultados;
   }));

  }



}
