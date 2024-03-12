import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InitiativeSandBox } from 'src/app/shared/sandbox/initiativeSandBox';
import Toast from 'awesome-toast-component';
import { BitacoraComentariosSandBox } from 'src/app/shared/sandbox/bitacora-comentarios';
import { ProcessComentarioBitacora } from 'src/app/shared/interfaces/comentarios-bitacora';

@Component({
  selector: 'coppel-iniciativas-confirm',
  templateUrl: './iniciativas-confirm.component.html',
  styleUrls: ['./iniciativas-confirm.component.scss'],
})
export class IniciativasConfirmComponent {
  commentToAction: String;
  disbleButton: boolean = true;
  showDetail: boolean = true;
  messageButton: string = 'Mostrar Detalles';
  bitacoraData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<IniciativasConfirmComponent>,
    public initiativeSandBox: InitiativeSandBox,
    private bitacoraSandbox: BitacoraComentariosSandBox
  ) {
    console.log(
      '🚀 ~ file: iniciativas-confirm.component.ts:17 ~ IniciativasConfirmComponent ~ this.data:',
      this.data
    );

    let dataCast = this.data.bitacoraDetail.filter((data) => {
      if (data.tipomodulo === 'INICIATIVAS') {
        return data;
      }
    });
    console.log("🚀 ~ file: iniciativas-confirm.component.ts:35 ~ IniciativasConfirmComponent ~ dataCast ~ dataCast:", dataCast)



    this.bitacoraData = dataCast.filter((data) => {
      
      console.log("🚀 ~ file: iniciativas-confirm.component.ts:40 ~ IniciativasConfirmComponent ~ this.bitacoraData=dataCast.filter ~ data.idreferencia === this.data.dataSelected.folio:", data.idreferencia === this.data.dataSelected.folio)
      
      if (
        data.idreferencia == this.data.dataSelected.folio
      ) {
        return data;
      }
    });
      
    console.log("🚀 ~ file: iniciativas-confirm.component.ts:43 ~ IniciativasConfirmComponent ~ this.bitacoraData=dataCast.filter ~ this.bitacoraData:", this.bitacoraData)


    
  }
    

  closeDialog(message) {
    this.dialogRef.close({ status: message });
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

  oerationAction(typeOperation: string) {
    console.log(
      '🚀 ~ file: iniciativas-confirm.component.ts:21 ~ IniciativasConfirmComponent ~ operation ~ typeOperation:',
      typeOperation
    );
    switch (typeOperation) {
      case 'delete':
        if (
          this.commentToAction !== '' ||
          this.commentToAction !== null ||
          this.commentToAction !== undefined
        ) {
          let data: ProcessComentarioBitacora = {
            tipoaccion: 'ELIMINAR',
            tipomodulo: 'INICIATIVAS',
            comentario: this.commentToAction.toString(),
            idusuario: 1,
            idreferencia: this.data.dataSelected.folio.toString(),
            referenciavalor: this.data.dataSelected.tituloIniciativa,
            jsonPayload: '',
          };
          this.createComment(data);
          this.initiativeSandBox
            .delete(Number(this.data.dataSelected.idIniciativa))
            .subscribe(
              (result) => {
                new Toast(` Se han guardado los cambios `, {
                  position: 'bottom',
                });
                this.closeDialog('OK');
              },
              (error) => {
                new Toast(`Ha ocurrido un error`, {
                  position: 'bottom',
                });
                this.closeDialog(' NOK ');
              }
            );
        }
        break;
      case 'add':
        if (
          this.commentToAction !== '' ||
          this.commentToAction !== null ||
          this.commentToAction !== undefined
        ) {
          let data: ProcessComentarioBitacora = {
            tipoaccion: 'AGREGAR',
            tipomodulo: 'INICIATIVAS',
            comentario: this.commentToAction.toString(),
            idusuario: 1,
            idreferencia: this.data.dataSelected.folio.toString(),
            referenciavalor: this.data.dataSelected.tituloIniciativa,
            jsonPayload: '',
          };

          this.createComment(data);
          this.initiativeSandBox.add(this.data.dataSelected).subscribe(
            (result) => {
              new Toast(` Se han guardado los cambios `, {
                position: 'bottom',
              });
              this.closeDialog('OK');
            },
            (error) => {
              new Toast(`Ha ocurrido un error`, {
                position: 'bottom',
              });
              this.closeDialog(' NOK ');
            }
          );
        }
        break;
      case 'update':
        if (
          this.commentToAction !== '' ||
          this.commentToAction !== null ||
          this.commentToAction !== undefined
        ) {
          let data: ProcessComentarioBitacora = {
            tipoaccion: 'ELIMINAR',
            tipomodulo: 'INICIATIVAS',
            comentario: this.commentToAction.toString(),
            idusuario: 1,
            idreferencia: this.data.dataSelected.folio.toString(),
            referenciavalor: this.data.dataSelected.tituloIniciativa,
            jsonPayload: '',
          };
          this.createComment(data);
          this.initiativeSandBox.patch(this.data.dataSelected).subscribe(
            (result) => {
              new Toast(` Se han guardado los cambios `, {
                position: 'bottom',
              });
              this.closeDialog('OK');
            },
            (error) => {
              new Toast(`Ha ocurrido un error`, {
                position: 'bottom',
              });
              this.closeDialog(' NOK ');
            }
          );
        }
        break;

      default:
        break;
    }
  }
}
