import { Injectable } from '@angular/core';
import { InitiativeModel } from '../interfaces/initiative-interface';
import { InitiativeService } from 'src/app/services/initiatives/initiative.service';
import { Observable } from 'rxjs';
import Toast from 'awesome-toast-component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssinationProcess } from '../interfaces/assignation-interface';

@Injectable({
  providedIn: 'root',
})
export class InitiativeSandBox {
  constructor(
    private initiativeService: InitiativeService,
    private _snackBar: MatSnackBar
  ) {}

  add(initiativeModel: InitiativeModel): Observable<any> {
    return this.initiativeService.addIniciativa(initiativeModel);
  }
  /*add( initiativeModel :  InitiativeModel) : Observable<any> {
        rethis.initiativeService.addIniciativa(initiativeModel).subscribe({
            return next(value);
             
            });
    }*/

  /*add( initiativeModel :  InitiativeModel) {
        
            this.initiativeService.addIniciativa(initiativeModel).subscribe(result => {
                // Handle result
                console.log(result)
                debugger;
              },
              error => {
                debugger;
                console.log( error);
              });
    }*/

  /*
    add( initiativeModel :  InitiativeModel) {
        
        return new Observable<String> ( (observer : any ) => {
            
            this.initiativeService.addIniciativa(initiativeModel).subscribe({
                next(value) {
                    debugger;
                    console.log(" *  Resultado Add *  " ,  value);
                    return " OK ";
                },
                error(err) {
                    debugger;
                    console.log(" Error Peticion  Add " , err);
                    return " NOK";
                    },
            });
        });
    }*/

  patch(initiativeModel: InitiativeModel) {
    return this.initiativeService.actualizarIniciativa(initiativeModel);
  }
  /*patch(initiativeModel :  InitiativeModel){
        return new Observable<InitiativeModel> ( (observer : any ) => { 
             this.initiativeService.actualizarIniciativa(initiativeModel).subscribe({
            next(value) {
                console.log(" *  Resultado Patch *  " ,  value);
                return value;
            },
            error(err) {
                console.log(" Error Peticion  patch " , err);
                return err;
            },
            });
        });
    }*/

  /*
    delete(idInititive : Number){
        return new Observable<InitiativeModel> ( (observer : any ) => {
            this.initiativeService.eliminarIniciativa(idInititive).subscribe(  {
                next(value) {

                    console.log(" *  Resultado *  " ,  value);
                },
                error(err) {
                    console.log(" Error Peticion  delete " , err);
                },
            });
        });  
    }
    */
  delete(idInititive: Number) {
    return this.initiativeService.eliminarIniciativa(idInititive);
  }

  getInciativas(tipo: string, estatus: string, tituloInciativa: string) {
    return new Observable<Array<InitiativeModel>>((observer: any) => {
      this.initiativeService
        .consultarIniciativa(tipo, estatus, tituloInciativa)
        .subscribe((res) => {
          observer.next(res);
          observer.complete();
        });
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  getAsignados(idInitiative: Number) {
    return new Observable<AssinationProcess>((observer: any) => {
      this.initiativeService
        .consultarColaboradoresAsignados(idInitiative)
        .subscribe((res) => {
          observer.next(res);
          observer.complete();
        });
    });
  }

  patchAssigment(assigment: AssinationProcess): Observable<any> {
    return this.initiativeService.addAssgment(assigment);
  }
}
