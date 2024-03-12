import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InitiativeModel } from 'src/app/shared/interfaces/initiative-interface';
import { InitiativeSandBox } from 'src/app/shared/sandbox/initiativeSandBox';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { AssinationProcess } from 'src/app/shared/interfaces/assignation-interface';
import { CollaboratorSandbox } from 'src/app/shared/sandbox/collaborators-sandbox';
import { ResultCollaborators } from 'src/app/shared/interfaces/result-collaborators';

import Toast from 'awesome-toast-component';
import { AssigmentColaboratorProcess } from 'src/app/shared/interfaces/colaborator-assigment';
import { AsignacionesComfirmComponent } from 'src/app/components/asignaciones-comfirm/asignaciones-comfirm.component';
import { MatDialog } from '@angular/material/dialog';
import { BitacoraComentariosSandBox } from 'src/app/shared/sandbox/bitacora-comentarios';
import { ProcessComentarioBitacora } from 'src/app/shared/interfaces/comentarios-bitacora';

export class ColaboradorProcess extends ResultCollaborators {
  porcentajeAsinacion: Number;
}

@Component({
  selector: 'coppel-grid-assignments',
  templateUrl: './grid-assignments.component.html',
  styleUrls: ['./grid-assignments.component.scss'],
})
export class GridAssignmentsComponent implements OnInit {
  public percentIncomes = '70';
  public controlInput: string;
  public filter: any = {
    income: true,
    expense: true,
    pending: true,
  };
  public stringDefaultValue: string = '';
  public controlInputCollaborators: string;
  public title = 'Asignaciones';
  public currentResponseAssigmentsColaborators: Array<ColaboradorProcess>;
  public existAssignatedColaborators: boolean;
  public currentSelectedInitiative: Number;
  csv1Span!: HTMLElement;
  csvSpan!: HTMLElement;
  showDownloadButton = false;

  /* Carga de Grid Iniativas */
  public displayedColumns: string[] = [
    'folio',
    'tituloIniciativa',
    'numIntegrantes',
    'porcentajeAvance',
  ];
  public dataSourceInitatives: MatTableDataSource<InitiativeModel>;
  public clickedRows = new Set<InitiativeModel>();

  /* Carga de colaboradores */
  public displayedColumnsColaboradores: string[] = [
    'select',
    'nombre',
    'fulltime',
    'porcentajeAsinacion',
  ];
  public dataSourceColaboradores: MatTableDataSource<ColaboradorProcess>;
  selection = new SelectionModel<ColaboradorProcess>(true, []);

  @ViewChildren(MatPaginator) paginatorGlobal = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sortGlobal = new QueryList<MatSort>();
  rowSelected: any;
  showErrorPorcentaje: boolean = false;
  bitacoraData: ProcessComentarioBitacora[];
  //bitacoraData: import('/Users/admin/Downloads/Integración/GestorColaboradoresFront/src/app/shared/interfaces/comentarios-bitacora').ProcessComentarioBitacora[];
  showDetailButton: boolean = false;

  constructor(
    private hhtpClient: HttpClient,
    private iniciativasSanbox: InitiativeSandBox,
    private colaboradoresSandbox: CollaboratorSandbox,
    public dialog: MatDialog,
    private bitacoraSandbox: BitacoraComentariosSandBox
  ) {
    this.currentSelectedInitiative = 0;
  }

  checkData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let castData = parseInt(filterValue);
    castData > 100 || castData < 0
      ? (this.showErrorPorcentaje = true)
      : (this.showErrorPorcentaje = false);
  }

  getBitacora() {
    this.bitacoraSandbox.getInciativas().subscribe((res) => {
      this.bitacoraData = res;
    });
  }

  ngOnInit(): void {
    this.getBitacora();
    console.log(' * Se ha invicado  ngOninit * ');
    this.processRequestConsultaIniciativas(
      this.stringDefaultValue,
      this.stringDefaultValue,
      this.stringDefaultValue
    );
    this.processRequestColaboradores();
  }

  processRequestColaboradores() {
    this.colaboradoresSandbox
      .getCollaboratorsSandbox()
      .subscribe((response) => {
        console.log(' *  Resultado  Colaboradores * ', response);

        let arrayColaboratorProcessCollection = new Array<ColaboradorProcess>();

        response.forEach((item) => {
          arrayColaboratorProcessCollection.push({
            ...item,
            porcentajeAsinacion: 0,
          });
        });

        this.dataSourceColaboradores = new MatTableDataSource(
          arrayColaboratorProcessCollection
        );
        this.dataSourceColaboradores.paginator =
          this.paginatorGlobal.toArray()[1];
        this.dataSourceColaboradores.sort = this.sortGlobal.toArray()[1];
        this.currentResponseAssigmentsColaborators =
          arrayColaboratorProcessCollection;
      });
  }

  /* Carga de Grid Iniativas */
  processRequestConsultaIniciativas(
    tipo: string,
    status: string,
    tituloIniciativa: string
  ) {
    this.iniciativasSanbox
      .getInciativas(tipo, status, tituloIniciativa)
      .subscribe((response) => {
        console.log(' *  Resultado  * ', response);

        this.dataSourceInitatives = new MatTableDataSource(response);
        this.dataSourceInitatives.paginator = this.paginatorGlobal.toArray()[0];
        this.dataSourceInitatives.sort = this.sortGlobal.toArray()[0];
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceInitatives.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceInitatives.paginator) {
      this.dataSourceInitatives.paginator.firstPage();
    }
  }
  /* Carga de Grid Iniativas */

  applyFilterColaboradores(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(
      '🚀 ~ file: grid-assignments.component.ts:160 ~ GridAssignmentsComponent ~ applyFilterColaboradores ~ filterValue:',
      filterValue
    );

    this.dataSourceColaboradores.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceColaboradores.paginator) {
      this.dataSourceColaboradores.paginator.firstPage();
    }
  }

  loadDataColaboratorAsigments(row) {
    this.dataSourceInitatives.filter = row.folio;
    // this.controlInput = '';

    if (this.dataSourceInitatives.paginator) {
      this.dataSourceInitatives.paginator.firstPage();
    }

    this.showDetailButton = true;

    console.log(' * On click  item  Initiative * ', row);
    if (row) {
      this.rowSelected = row;
      this.currentSelectedInitiative = row.idIniciativa;
    }

    this.iniciativasSanbox
      .getAsignados(Number(row.idIniciativa))
      .subscribe((response) => {
        if (response.colaboradoresAsignacionDTO.length > 0) {
          let resultArrayAssigmets = new Array<ColaboradorProcess>();
          response.colaboradoresAsignacionDTO.forEach((item) => {
            let result = this.currentResponseAssigmentsColaborators.filter(
              (itemGeneralColaborarators) => {
                return (
                  itemGeneralColaborarators.idColaborador == item.idColaborador
                );
              }
            );
            if (result[0]) {
              result[0].porcentajeAsinacion = item.porcentajeAsignacion;
              resultArrayAssigmets.push(result[0]);
            }
          });

          this.dataSourceColaboradores = new MatTableDataSource(
            resultArrayAssigmets
          );
          this.dataSourceColaboradores.paginator =
            this.paginatorGlobal.toArray()[1];
          this.dataSourceColaboradores.sort = this.sortGlobal.toArray()[1];
          //this.currentResponseAssigmentsColaborators  =  resultArrayAssigmets;
          this.selection = new SelectionModel<ColaboradorProcess>(
            true,
            resultArrayAssigmets
          );
        }
      });
  }

  loadExtraColaborators() {
    if (this.selection.selected.length > 0) {
      let currentSelectedColaboratos = this.selection.selected;
      console.log(
        '*  Colaboradores  seleccionados : *',
        currentSelectedColaboratos
      );

      let resultArrayAssigmets = new Array<ColaboradorProcess>();
      resultArrayAssigmets = this.currentResponseAssigmentsColaborators.filter(
        (item) => {
          return !currentSelectedColaboratos.includes(item);
        }
      );

      console.log(
        '*  Colaboradores  seleccionados : *',
        currentSelectedColaboratos.length,
        ' extras : ',
        resultArrayAssigmets.length
      );

      let fullData = currentSelectedColaboratos.concat(resultArrayAssigmets);

      this.dataSourceColaboradores = new MatTableDataSource(fullData);
      this.dataSourceColaboradores.paginator =
        this.paginatorGlobal.toArray()[1];
      this.dataSourceColaboradores.sort = this.sortGlobal.toArray()[1];
      this.selection = new SelectionModel<ColaboradorProcess>(
        true,
        currentSelectedColaboratos
      );
    }
  }

  showDeiail() {
    console.log(
      ' * Data to Save *  Initiative :',
      this.currentSelectedInitiative,
      '  * Items  ',
      this.selection.selected
    );

    if (this.currentSelectedInitiative && this.selection.selected.length > 0) {
      let assginationProcess = new AssinationProcess();

      assginationProcess.idIniciativa = this.currentSelectedInitiative;
      let arrayAssigmentsColaborators =
        new Array<AssigmentColaboratorProcess>();

      this.selection.selected.forEach((element) => {
        let colaboratorAssigment = new AssigmentColaboratorProcess();
        colaboratorAssigment.idColaborador = Number(element.idColaborador);
        colaboratorAssigment.porcentajeAsignacion = Number(
          element.porcentajeAsinacion
        );
        arrayAssigmentsColaborators.push(colaboratorAssigment);
      });
      assginationProcess.colaboradoresAsignacionDTO =
        arrayAssigmentsColaborators;

      const dialogRef = this.dialog.open(AsignacionesComfirmComponent, {
        closeOnNavigation: false,
        hasBackdrop: true,
        data: {
          typeOperation: 'bitacora',
          name: 'Biitácora Asignaciones',
          buttonName: '',
          dataSelected: assginationProcess,
          asignation: this.rowSelected,
          userSelected: this.selection.selected,
          bitacoraDetail: this.bitacoraData,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.getBitacora();
        this.showDetailButton = false;
        this.processRequestConsultaIniciativas(
          this.stringDefaultValue,
          this.stringDefaultValue,
          this.stringDefaultValue
        );
        this.processRequestColaboradores();
        this.currentSelectedInitiative = 0;
        //this.animal = result;
      });
    } else {
      new Toast(` Por favor elija una iniciativa y asigne colaboradores `, {
        position: 'bottom',
      });
    }
  }

  clearData() {
    this.controlInput = '';
    this.controlInputCollaborators = '';
    this.processRequestConsultaIniciativas(
      this.stringDefaultValue,
      this.stringDefaultValue,
      this.stringDefaultValue
    );
    this.processRequestColaboradores();
  }

  saveChanges() {
    console.log(
      ' * Data to Save *  Initiative :',
      this.currentSelectedInitiative,
      '  * Items  ',
      this.selection.selected
    );

    if (this.currentSelectedInitiative && this.selection.selected.length > 0) {
      let assginationProcess = new AssinationProcess();

      assginationProcess.idIniciativa = this.currentSelectedInitiative;
      let arrayAssigmentsColaborators =
        new Array<AssigmentColaboratorProcess>();

      this.selection.selected.forEach((element) => {
        let colaboratorAssigment = new AssigmentColaboratorProcess();
        colaboratorAssigment.idColaborador = Number(element.idColaborador);
        colaboratorAssigment.porcentajeAsignacion = Number(
          element.porcentajeAsinacion
        );
        arrayAssigmentsColaborators.push(colaboratorAssigment);
      });
      assginationProcess.colaboradoresAsignacionDTO =
        arrayAssigmentsColaborators;

      const dialogRef = this.dialog.open(AsignacionesComfirmComponent, {
        closeOnNavigation: false,
        hasBackdrop: true,
        data: {
          showDetail: true,
          typeOperation: 'update',
          name: 'Actualizar Asignaciones',
          buttonName: 'Actualizar',
          dataSelected: assginationProcess,
          asignation: this.rowSelected,
          userSelected: this.selection.selected,
          bitacoraDetail: this.bitacoraData,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.getBitacora();
        this.showDetailButton = false;
        this.processRequestConsultaIniciativas(
          this.stringDefaultValue,
          this.stringDefaultValue,
          this.stringDefaultValue
        );
        this.processRequestColaboradores();
        this.currentSelectedInitiative = 0;
        //this.animal = result;
      });
    } else {
      new Toast(` Por favor elija una iniciativa y asigne colaboradores `, {
        position: 'bottom',
      });
    }
  }

  /* Creacion de funcion para descargar Csv */
  /*onDownloadFile() {
    this.hhtpClient
      .get('http://localhost:8080/gestor-app/report/asignaciones', {
        responseType: 'blob',
      })
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'asignaciones.csv';
        a.click();
      });
  }*/
  onDownloadFile() {
    this.showDownloadButton = true;
    //this.csv1Span.style.display = 'inline-block';

    this.hhtpClient
      .get('http://localhost:8080/gestor-app/report/asignaciones', {
        responseType: 'blob',
      })
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'asignaciones.csv';
        a.click();
      });

    setTimeout(() => {
      this.showDownloadButton = false;
      //this.csv1Span.style.display = 'none';
    }, 2000);
  }
}

//https://stackoverflow.com/questions/68200854/how-to-programmatically-set-check-state-of-mat-checkbox-in-mat-table
