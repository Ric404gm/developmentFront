import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InitiativeSandBox } from 'src/app/shared/sandbox/initiativeSandBox';
import Toast from 'awesome-toast-component';
import { BitacoraComentariosSandBox } from 'src/app/shared/sandbox/bitacora-comentarios';
import { ProcessComentarioBitacora } from 'src/app/shared/interfaces/comentarios-bitacora';

@Component({
  selector: 'coppel-asignaciones-comfirm',
  templateUrl: './asignaciones-comfirm.component.html',
  styleUrls: ['./asignaciones-comfirm.component.scss'],
})
export class AsignacionesComfirmComponent {
  commentToAction: string;
  disbleButton: boolean = true;
  showDetail: boolean = true;
  messageButton: string = 'Mostrar Detalles';
  bitacoraData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AsignacionesComfirmComponent>,
    private iniciativasSanbox: InitiativeSandBox,
    private bitacoraSandbox: BitacoraComentariosSandBox
  ) {
    let dataCast = this.data.bitacoraDetail.filter((data) => {
      if (data.tipomodulo === "ASIGNACIONES") {
        return data;
      }
    });
    console.log("🚀 ~ file: asignaciones-comfirm.component.ts:30 ~ AsignacionesComfirmComponent ~ dataCast ~ dataCast:", dataCast)

    
    console.log("🚀 ~ file: asignaciones-comfirm.component.ts:33 ~ AsignacionesComfirmComponent ~ this.data.asignation.folio:", this.data.asignation.folio)
    this.bitacoraData = dataCast.filter((data) => {
      if (
        data.idreferencia === this.data.asignation.folio
      ) {
        return data;
      }

      
    });
    console.log("🚀 ~ file: asignaciones-comfirm.component.ts:43 ~ AsignacionesComfirmComponent ~ this.bitacoraData=dataCast.filter ~ this.bitacoraData:", this.bitacoraData)
    console.log(
      '🚀 ~ file: asignaciones-comfirm.component.ts:16 ~ AsignacionesComfirmComponent ~ this.data:',
      this.data
    );
  }
  viewData() {
    this.showDetail === true
      ? (this.messageButton = 'Regresar')
      : (this.messageButton = 'Mostrar Detalles');
    this.showDetail === true
      ? (this.showDetail = false)
      : (this.showDetail = true);
  }

  createComment(data: ProcessComentarioBitacora) {
    this.bitacoraSandbox.add(data).subscribe((res) => {
      console.log(
        '🚀 ~ file: delete-collaborator.component.ts:43 ~ DeleteCollaboratorComponent ~ this.bitacoraSandbox.add ~ res:',
        res
      );
    });
  }

  commentData(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    console.log(
      '🚀 ~ file: delete-collaborator.component.ts:51 ~ DeleteCollaboratorComponent ~ commentData ~ filterValue:',
      filterValue
    );
    filterValue !== ''
      ? (this.disbleButton = false)
      : (this.disbleButton = true);
  }

  operationType(data: string) {
    switch (data) {
      case 'update':
        if (
          this.commentToAction !== '' ||
          this.commentToAction !== null ||
          this.commentToAction !== undefined
        ) {
          this.iniciativasSanbox
            .patchAssigment(this.data.dataSelected)
            .subscribe(
              (result) => {
                new Toast(` Se han guardado los cambios `, {
                  position: 'bottom',
                });

                let data: ProcessComentarioBitacora = {
                  tipoaccion: 'EDITAR',
                  tipomodulo: 'ASIGNACIONES',
                  comentario: this.commentToAction.toString(),
                  idusuario: 1,
                  idreferencia: this.data.asignation.folio.toString(),
                  referenciavalor: this.data.asignation.tituloIniciativa,
                  jsonPayload: '',
                };
                this.createComment(data);
              },

              (error) => {
                new Toast(`Ha ocurrido un error`, {
                  position: 'bottom',
                });
              }
            );
        }
        break;

      default:
        break;
    }
  }
}
