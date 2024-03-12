import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CollaboratorsService } from 'src/app/services/collaborators/collaborators.service';
import { ResultCollaborators } from '../interfaces/result-collaborators';
import { SkillsToCollaborators } from '../interfaces/skillsToCollaboratos';
import { ReponseSkills } from '../interfaces/responseSkills';

@Injectable({
  providedIn: 'root',
})

/**
 * Creates an instance of CollaboratorSandbox.
 *
 * @memberof CollaboratorSandbox
 */
export class CollaboratorSandbox {
  @Output() realodData: EventEmitter<boolean> = new EventEmitter<any>();


  constructor(private collaboratorService: CollaboratorsService) {}

  public deleteCollaborator(
    idCollaborator: number
  ): Observable<Array<ResultCollaborators>> {
    return new Observable<Array<ResultCollaborators>>((observer: any) => {
      this.collaboratorService
        .deleteCollaborator(idCollaborator)
        .subscribe((res) => {
          observer.next(res);
          observer.complete();
        });
    });
  }

  public createCollaborator(
    data: ResultCollaborators
  ): Observable<ResultCollaborators> {
    return new Observable<ResultCollaborators>((observer: any) => {
      this.collaboratorService.newCollaborator(data).subscribe((res) => {
        observer.next(res);
        observer.complete();
      });
    });
  }

  public updateSkillsAdCollaborators(data: SkillsToCollaborators) {
    return new Observable<ReponseSkills>((observer: any) => {
      this.collaboratorService
        .updateCollaborarorAndSkills(data)
        .subscribe((res) => {
          observer.next(res);
          observer.complete();
        });
    });
  }

  public updateCollaborator(
    data: ResultCollaborators
  ): Observable<Array<ResultCollaborators>> {
    return new Observable<Array<ResultCollaborators>>((observer: any) => {
      this.collaboratorService.updateCollaborator(data).subscribe((res) => {
        observer.next(res);
        observer.complete();
      });
    });
  }

  public getCollaboratorsSandbox(): Observable<Array<ResultCollaborators>> {
    return new Observable<Array<ResultCollaborators>>((observer: any) => {
      this.collaboratorService.getCollaborators().subscribe((res) => {
        observer.next(res);
        observer.complete();
      });
    });
  }
}
