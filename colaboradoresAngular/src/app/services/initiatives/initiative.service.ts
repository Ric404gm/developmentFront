import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InitiativeModel } from 'src/app/shared/interfaces/initiative-interface';
import { map } from 'rxjs/operators';
import { AssinationProcess } from 'src/app/shared/interfaces/assignation-interface';

@Injectable({
  providedIn: 'root',
})
export class InitiativeService {
  private url = 'http://localhost:8080/gestor-app/iniciativas';
  private urlAssigments = 'http://localhost:8080/gestor-app/asignaciones';

  constructor(private httpclient: HttpClient) {}

  addIniciativa(initiative: InitiativeModel): Observable<any> {
    return this.httpclient.post(`${this.url}/registrar`, initiative);
  }
  actualizarIniciativa(initiative: InitiativeModel): Observable<any> {
    return this.httpclient.put(`${this.url}/editar`, initiative);
  }
  eliminarIniciativa(initativeId: Number): Observable<any> {
    return this.httpclient.delete(
      `${this.url}/eliminar?numeroIniciativa=${initativeId}`
    );
  }

  consultarIniciativa(
    tipo: string,
    estatus: string,
    tituloInciativa: string
  ): Observable<Array<InitiativeModel>> {
    let body = {
      tituloIniciativa: tituloInciativa,
      idTipoProyecto: tipo,
      idEstatus: estatus,
    };

    return this.httpclient.post<any>(`${this.url}/consultar`, body).pipe(
      map((data: any) => {
        return data.resultados;
      })
    );
  }

  consultarColaboradoresAsignados(
    initativeId: Number
  ): Observable<AssinationProcess> {
    return this.httpclient
      .get<any>(`${this.urlAssigments}/consultar/iniciativa/${initativeId}`)
      .pipe(
        map((data: any) => {
          return data.resultados;
        })
      );
  }

  addAssgment(assigment: AssinationProcess): Observable<any> {
    return this.httpclient.put(
      `${this.urlAssigments}/actualizar/asignaciones`,
      assigment
    );
  }
}
