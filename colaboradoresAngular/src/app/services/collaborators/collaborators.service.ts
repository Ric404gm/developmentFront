import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ReponseSkills } from 'src/app/shared/interfaces/responseSkills';
import { ResultCollaborators } from 'src/app/shared/interfaces/result-collaborators';
import { SkillsToCollaborators } from 'src/app/shared/interfaces/skillsToCollaboratos';
import Toast from "awesome-toast-component";

@Injectable({
  providedIn: 'root',
})
export class CollaboratorsService {
  constructor(private hhtpClient: HttpClient) {}

  private url: string = 'http://localhost:8080/gestor-app/colaboradores';

  getCollaborators(): Observable<Array<ResultCollaborators>> {
    return this.hhtpClient.get(`${this.url}/listar`).pipe(
      map((response: any) => {
        return response.resultados;
      })
    );
  }

  public newCollaborator(
    data: ResultCollaborators
  ): Observable<ResultCollaborators> {
    const body = { ...data };
    return this.hhtpClient.post(`${this.url}/registrar`, body).pipe(
      map((response: any) => {
        return response.resultados;
      })
    );
  }

  public updateCollaborator(
    data: ResultCollaborators
  ): Observable<Array<ResultCollaborators>> {
    const body = { ...data };
    return this.hhtpClient.put(`${this.url}/editar`, body).pipe(
      map((response: any) => {
        return response.resultados;
      })
    );
  }

  public updateCollaborarorAndSkills(body: SkillsToCollaborators): Observable<ReponseSkills> {
    return this.hhtpClient.post(`${this.url}/registrarSkills`, body).pipe(
      map((response: any) => {
        return response.resultados;
      })
    );
  } 

  public deleteCollaborator(
    idCollaborator: number
  ): Observable<Array<ResultCollaborators>> {
    return this.hhtpClient.delete(`${this.url}/eliminar?idColaborador=${idCollaborator}`).pipe(
      map((response: any) => {
        return response.resultados;
      })
    );
  }
}
