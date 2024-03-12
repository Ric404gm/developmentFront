import { Component, OnInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { DialogInitiativesComponent } from './dialog-initiatives/dialog-initiatives.component';
import { CatalogoGestor } from 'src/app/shared/interfaces/catalog-interface';
import { CatalogsSandBox } from 'src/app/shared/sandbox/catalogos-sandbox';
import { InitiativeSandBox } from 'src/app/shared/sandbox/initiativeSandBox';
import { InitiativeModel } from 'src/app/shared/interfaces/initiative-interface';

@Component({
  selector: 'coppel-griid-initiatives',
  templateUrl: './griid-initiatives.component.html',
  styleUrls: ['./griid-initiatives.component.scss'],
})
export class GriidInitiativesComponent implements OnInit {
  public controlInput: string;
  public displayedColumns: string[] = [
    'folio',
    'tituloIniciativa',
    'porcentajeAvance',
  ];
  public dataSourceInitatives: MatTableDataSource<InitiativeModel>;
  public stringDefaultValue: string = '';
  public title = ' Iniciativas ';
  public clickedRows = new Set<InitiativeModel>();
  public selectedTipo = '';
  public selectedEstatus = '';
  public filter: any = { income: true, expense: true, pending: true };

  public catalogoTipoProyecto: Array<CatalogoGestor>;
  public catalogTipoEstatus: Array<CatalogoGestor>;
  public catalogDirecciones: Array<CatalogoGestor>;
  public catalogSolicitantes: Array<CatalogoGestor>;
  public catalogosModelosOperativos: Array<CatalogoGestor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private iniciativasSanbox: InitiativeSandBox,
    private catalogSandBox: CatalogsSandBox,
    public dialog: MatDialog
  ) {
    console.log('  *  Load Constructor *');
    this.dataSourceInitatives = new MatTableDataSource();
    this.dataSourceInitatives.paginator = this.paginator;
    this.sort = new MatSort();
  }

  ngOnInit(): void {
    console.log(' * Se ha invicado  ngOninit * ');
    this.processRequestConsultaIniciativas(
      this.stringDefaultValue,
      this.stringDefaultValue,
      this.stringDefaultValue
    );
    this.processRequestCatalogs('tiposproyecto');
    this.processRequestCatalogs('estatus');
    this.processRequestCatalogs('direcciones');
    this.processRequestCatalogs('solicitantes');
    this.processRequestCatalogs('modelosoperativos');
  }

  clearFilters() {
    this.selectedTipo = '';
    this.selectedEstatus ='';
    this.processRequestConsultaIniciativas(
      this.stringDefaultValue,
      this.stringDefaultValue,
      this.stringDefaultValue
    );
  }

  processRequestCatalogs(stringCatalogVale: string) {
    this.catalogSandBox.get(stringCatalogVale).subscribe((response) => {
      if (stringCatalogVale === 'tiposproyecto') {
        console.log('  *  consulta de catalogs tipo * ', response);
        this.catalogoTipoProyecto = response;
      } else if (stringCatalogVale === 'estatus') {
        console.log('  *  consulta de catalogs estatus * ', response);
        this.catalogTipoEstatus = response;
      } else if (stringCatalogVale === 'direcciones') {
        console.log('  *  consulta de catalogs direcciones * ', response);
        this.catalogDirecciones = response;
      } else if (stringCatalogVale === 'solicitantes') {
        this.catalogSolicitantes = response;
      } else if (stringCatalogVale === 'modelosoperativos') {
        this.catalogosModelosOperativos = response;
      }
    });
  }

  processRequestConsultaIniciativas(
    tipo: string,
    status: string,
    tituloIniciativa: string
  ) {
    this.iniciativasSanbox
      .getInciativas(tipo, status, tituloIniciativa)
      .subscribe((response) => {
        console.log(' *  Resultado  * ', response);
        let data = response.sort((a, b) => a.idIniciativa - b.idIniciativa);
        this.dataSourceInitatives = new MatTableDataSource(response);
        this.dataSourceInitatives.paginator = this.paginator;
        this.dataSourceInitatives.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceInitatives.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceInitatives.paginator) {
      this.dataSourceInitatives.paginator.firstPage();
    }
  }

  onChangeTipoProyecto(event) {
    console.log(' * On event: *', event.value, this.selectedTipo);

    this.processRequestConsultaIniciativas(
      this.selectedTipo,
      this.selectedEstatus !== this.stringDefaultValue
        ? this.selectedEstatus
        : this.stringDefaultValue,
      this.stringDefaultValue
    );
  }

  onChangeTipoEstatus(event) {
    console.log(' * On event: *', event.value, this.selectedEstatus);
    this.processRequestConsultaIniciativas(
      this.selectedTipo != this.stringDefaultValue
        ? this.selectedTipo
        : this.stringDefaultValue,
      this.selectedEstatus,
      this.stringDefaultValue
    );
  }

  openDialog(initiativeData): void {
    this.controlInput = '';
    const dialogRef = this.dialog.open(DialogInitiativesComponent, {
      data: {
        initiativeData: initiativeData,
        catalogoTipoProyecto: this.catalogoTipoProyecto,
        catalogTipoEstatus: this.catalogTipoEstatus,
        catalogDirecciones: this.catalogDirecciones,
        catalogSolicitantes: this.catalogSolicitantes,
        catalogosModelosOperativos: this.catalogosModelosOperativos,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.processRequestConsultaIniciativas(
        this.stringDefaultValue,
        this.stringDefaultValue,
        this.stringDefaultValue
      );
      console.log('* Se ha cerrado o salido del dialog *', result);
      if (result) {
        if (result.status == 'OK') {
          this.processRequestConsultaIniciativas(
            this.stringDefaultValue,
            this.stringDefaultValue,
            this.stringDefaultValue
          );
          this.selectedTipo = '';
          this.selectedEstatus = '';
        }
      }
    });
  }
}
