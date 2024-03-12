import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RegisterNewCollaboratorComponent } from 'src/app/components/register-new-collaborator/register-new-collaborator.component';
import { ResultCollaborators } from 'src/app/shared/interfaces/result-collaborators';
import { CollaboratorSandbox } from 'src/app/shared/sandbox/collaborators-sandbox';

@Component({
  selector: 'coppel-grid-colaborators',
  templateUrl: './grid-colaborators.component.html',
  styleUrls: ['./grid-colaborators.component.scss'],
})
export class GridColaboratorsComponent implements OnInit {
  public controlInput: string;
  public dataSourceCollaborators: MatTableDataSource<ResultCollaborators>;
  public clickedRows = new Set<ResultCollaborators>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public title = 'Colaboradores';
  displayedColumnsCollaborators: string[] = [
    'idColaborador',
    'nombre',
    'numColaborador',
    'tituloCentro',
    'skills',
  ];

  public filter: any = {
    income: true,
    expense: true,
    pending: true,
  };

  dataSource: any;

  constructor(
    private collaboratorsSandBox: CollaboratorSandbox,
    public dialog: MatDialog
  ) {
    this.dataSourceCollaborators = new MatTableDataSource();
    this.dataSourceCollaborators.paginator = this.paginator;
    this.sort = new MatSort();
  }

  getDataGrid() {
    this.collaboratorsSandBox.getCollaboratorsSandbox().subscribe((res) => {
      let data = res.sort((a, b) => a.idColaborador - b.idColaborador);
      this.dataSourceCollaborators = new MatTableDataSource(data);
      this.dataSourceCollaborators.paginator = this.paginator;
      this.dataSourceCollaborators.sort = this.sort;
    });
  }
  
  ngOnInit(): void {
    this.collaboratorsSandBox.realodData.subscribe((data) => {
      console.log(
        '🚀 ~ file: grid-colaborators.component.ts:57 ~ GridColaboratorsComponent ~ this.collaboratorsSandBox.realodData.subscribe ~ data:',
        data
      );
      if (data) {
        this.getDataGrid();
      }
    });
    this.getDataGrid();
  }

  public newCollaborator(): void {
    const dialogRef = this.dialog.open(RegisterNewCollaboratorComponent, {
      closeOnNavigation: false,
      hasBackdrop: true,
      data: { name: ' Registrar Colaborador', isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getDataGrid();
    });
  }

  public editData(data: ResultCollaborators) {
    this.controlInput = '';
    const dialogRef = this.dialog.open(RegisterNewCollaboratorComponent, {
      closeOnNavigation: false,
      hasBackdrop: true,
      data: { name: ' Editar Colaborador', isEdit: true, dataSelected: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(
        '🚀 ~ file: griid-initiatives.component.ts:124 ~ GriidInitiativesComponent ~ dialogRef.afterClosed ~ result:',
        result
      );
      if (result !== undefined) {
        this.getDataGrid();
        console.log('The dialog was closed');
      }
      this.getDataGrid();

      //this.animal = result;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCollaborators.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCollaborators.paginator) {
      this.dataSourceCollaborators.paginator.firstPage();
    }
  }

  public getDataToSearch(data: string): void {
    console.log(
      '🚀 ~ file: grid-colaborators.component.ts:44 ~ GridColaboratorsComponent ~ getDataToSearch ~ data:',
      data
    );
  }
}
