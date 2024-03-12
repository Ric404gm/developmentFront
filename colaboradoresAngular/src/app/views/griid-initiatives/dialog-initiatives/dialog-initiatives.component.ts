import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CatalogoGestor } from 'src/app/shared/interfaces/catalog-interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import Toast from 'awesome-toast-component';
import { InitiativeSandBox } from 'src/app/shared/sandbox/initiativeSandBox';
import { InitiativeModel } from 'src/app/shared/interfaces/initiative-interface';
import { IniciativasConfirmComponent } from 'src/app/components/iniciativas-confirm/iniciativas-confirm.component';
import { BitacoraComentariosSandBox } from 'src/app/shared/sandbox/bitacora-comentarios';
import { ProcessComentarioBitacora } from 'src/app/shared/interfaces/comentarios-bitacora';

export class DialogInitiativeParams {
  initiativeData: InitiativeModel;
  catalogoTipoProyecto: Array<CatalogoGestor>;
  catalogTipoEstatus: Array<CatalogoGestor>;
  catalogDirecciones: Array<CatalogoGestor>;
  catalogSolicitantes: Array<CatalogoGestor>;
  catalogosModelosOperativos: Array<CatalogoGestor>;
}

@Component({
  selector: 'coppel-dialog-initiatives',
  templateUrl: './dialog-initiatives.component.html',
  styleUrls: ['./dialog-initiatives.component.scss'],
})
export class DialogInitiativesComponent implements OnInit {
  public currentInitiativeModel = new InitiativeModel();
  public pickerFechaFin = '';
  public startDate = new Date();
  public endDate: Date;
  public isNewInitiative: boolean;
  public showErrorPorcentaje: boolean = false;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  bitacoraData: ProcessComentarioBitacora[];
  //bitacoraData: import('/Users/admin/Downloads/Integración/GestorColaboradoresFront/src/app/shared/interfaces/comentarios-bitacora').ProcessComentarioBitacora[];

  constructor(
    public dialogRef: MatDialogRef<DialogInitiativesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInitiativeParams,
    public initiativeSandBox: InitiativeSandBox,
    public dialog: MatDialog,
    private bitacoraSandbox: BitacoraComentariosSandBox
  ) {
    console.log(' * Load constructor * ', this.data);
    this.currentInitiativeModel = this.data.initiativeData
      ? this.loadDateData(this.data.initiativeData)
      : this.currentInitiativeModel;
    this.isNewInitiative = this.data.initiativeData ? false : true;
  }

  ngOnInit(): void {
    this.endDate = new Date();
    this.bitacoraSandbox.getInciativas().subscribe((res) => {
      this.bitacoraData = res;
    });

    // add a day
    this.endDate.setDate(this.endDate.getDate() + 1);
    console.log(
      '🚀 ~ file: dialog-initiatives.component.ts:68 ~ DialogInitiativesComponent ~ ngOnInit ~ this.endDate:',
      this.endDate
    );

    console.log(' * Load OnInit * ', this.data.initiativeData);
  }

  checkData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let castData = parseInt(filterValue);
    castData > 100 || castData < 0
      ? (this.showErrorPorcentaje = true)
      : (this.showErrorPorcentaje = false);
  }

  showBitacora() {
    const dialogRef = this.dialog.open(IniciativasConfirmComponent, {
      closeOnNavigation: false,
      hasBackdrop: true,
      data: {
        showDetail: true,
        dataSelected: this.currentInitiativeModel,
        typeOperation: 'bitacora',
        buttonName: '',
        name: 'Bitácora Iniciativa',
        bitacoraDetail: this.bitacoraData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(
          '🚀 ~ file: griid-initiatives.component.ts:124 ~ GriidInitiativesComponent ~ dialogRef.afterClosed ~ result:',
          result
        );
        this.dialogRef.close();
        console.log('The dialog was closed');
      }
    });
  }

  onSave() {
    this.currentInitiativeModel.fechaInicio = this.startDate
      .toLocaleString()
      .split(',')[0]
      .trim();
    this.currentInitiativeModel.fechaFin = this.endDate
      .toLocaleString()
      .split(',')[0]
      .trim();

    console.log(
      ' Fechas inicio : ',
      this.startDate.toLocaleString().split(',')[0].trim(),
      ' Fecha Fin ',
      this.endDate.toLocaleString().split(',')[0].trim()
    );
    console.log(
      '   Fecha : ',
      this.padTo2Digits(this.startDate.getDay()),
      '/',
      this.padTo2Digits(this.startDate.getMonth() + 1),
      '/',
      this.startDate.getFullYear()
    );

    this.currentInitiativeModel.fechaInicio =
      this.padTo2Digits(this.startDate.getUTCDate()) +
      '/' +
      this.padTo2Digits(this.startDate.getMonth() + 1) +
      '/' +
      this.startDate.getFullYear();
    this.currentInitiativeModel.fechaFin =
      this.padTo2Digits(this.endDate.getUTCDate()) +
      '/' +
      this.padTo2Digits(this.endDate.getMonth() + 1) +
      '/' +
      this.endDate.getFullYear();

    console.log(' * Save  * ', this.currentInitiativeModel);

    let resultfields =
      this.currentInitiativeModel.folio &&
      this.currentInitiativeModel.tituloIniciativa &&
      this.currentInitiativeModel.descripcion &&
      this.currentInitiativeModel.numIntegrantes &&
      this.currentInitiativeModel.porcentajeAvance &&
      this.currentInitiativeModel.fechaFin &&
      this.currentInitiativeModel.fechaInicio &&
      this.currentInitiativeModel.idDireccion &&
      this.currentInitiativeModel.idSolicitante &&
      this.currentInitiativeModel.idEstatus &&
      this.currentInitiativeModel.idTipoProyecto &&
      this.currentInitiativeModel.idModOp
        ? true
        : false;

    //debugger ;

    if (resultfields) {
      if (this.isNewInitiative) {
        const dialogRef = this.dialog.open(IniciativasConfirmComponent, {
          closeOnNavigation: false,
          hasBackdrop: true,
          data: {
            dataSelected: this.currentInitiativeModel,
            typeOperation: 'add',
            buttonName: 'Agregar Iniciativa',
            name: 'Agregar Iniciativa',
            bitacoraDetail: this.bitacoraData,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log(
            '🚀 ~ file: register-new-collaborator.component.ts:255 ~ RegisterNewCollaboratorComponent ~ dialogRefUpdate.afterClosed ~ result:',
            result
          );
          if (result !== undefined) {
            //this.animal = result;
            this.dialogRef.close();
          }
          //this.animal = result;
        });

        /*         this.initiativeSandBox
          .add(this.currentInitiativeModel)
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
          ); */
      } else {
        const dialogRef = this.dialog.open(IniciativasConfirmComponent, {
          closeOnNavigation: false,
          hasBackdrop: true,
          data: {
            dataSelected: this.currentInitiativeModel,
            typeOperation: 'update',
            buttonName: 'Actualizar Iniciativa',
            name: 'Actualizar Iniciativa',
            bitacoraDetail: this.bitacoraData,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result !== undefined) {
            console.log(
              '🚀 ~ file: griid-initiatives.component.ts:124 ~ GriidInitiativesComponent ~ dialogRef.afterClosed ~ result:',
              result
            );
            this.dialogRef.close();
            console.log('The dialog was closed');
          }

          //this.animal = result;
        });
        /* 
        this.initiativeSandBox.patch(this.currentInitiativeModel).subscribe(
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
        ); */
      }
    } else {
      new Toast(`Por favor llena los campos requeridos `, {
        position: 'bottom',
      });
    }
  }

  onDelete(idIniciativa: string) {
    console.log(
      '🚀 ~ file: dialog-initiatives.component.ts:148 ~ DialogInitiativesComponent ~ onDelete ~ idIniciativa:',
      idIniciativa
    );
    console.log(
      '🚀 ~ file: dialog-initiatives.component.ts:166 ~ DialogInitiativesComponent ~ onDelete ~ this.currentInitiativeModel:',
      this.currentInitiativeModel
    );
    const dialogRef = this.dialog.open(IniciativasConfirmComponent, {
      closeOnNavigation: false,
      hasBackdrop: true,
      data: {
        dataSelected: this.currentInitiativeModel,
        typeOperation: 'delete',
        buttonName: 'Eliminar Iniciativa',
        name: 'Eliminar Iniciativa',
        bitacoraDetail: this.bitacoraData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.dialogRef.close();

        console.log('The dialog was closed');
      }

      //this.animal = result;
    });

    /*     this.initiativeSandBox.delete(Number(idIniciativa)).subscribe(
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
    ); */
  }

  onChangeTipoProyecto(event) {
    console.log(' * Change   *  : ', event);
  }

  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  loadDateData(modelinitiative: InitiativeModel): InitiativeModel {
    this.startDate = this.getValidDateFromStringDate(
      modelinitiative.fechaInicio
    );
    this.endDate = this.getValidDateFromStringDate(modelinitiative.fechaFin);
    return modelinitiative;
  }

  getValidDateFromStringDate(dateString: string): Date {
    try {
      //var dateString = "13/05/2013"; // Oct 23
      console.log(' Convertir :  ', dateString, ' As String ');
      var newData = dateString.replace(/(\d+[/])(\d+[/])/, '$2$1');
      var data = new Date(newData);
      return data;
    } catch (error) {
      console.log(' Error Parse : ', error);
      return new Date();
    }
  }

  closeDialog(message) {
    this.dialogRef.close({ status: message });
  }

  isValidField(value: String): boolean {
    return value ? true : false;
  }
}
