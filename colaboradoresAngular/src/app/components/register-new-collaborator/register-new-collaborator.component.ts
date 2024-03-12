import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CatalogoGestor } from 'src/app/shared/interfaces/catalog-interface';
import { ResultCollaborators } from 'src/app/shared/interfaces/result-collaborators';
import { CatalogsSandBox } from 'src/app/shared/sandbox/catalogos-sandbox';
import { CollaboratorSandbox } from 'src/app/shared/sandbox/collaborators-sandbox';
import { DeleteCollaboratorComponent } from '../delete-collaborator/delete-collaborator.component';
import { SkillsToCollaborators } from 'src/app/shared/interfaces/skillsToCollaboratos';
import Toast from 'awesome-toast-component';
import { BitacoraComentariosSandBox } from 'src/app/shared/sandbox/bitacora-comentarios';

@Component({
  selector: 'coppel-register-new-collaborator',
  templateUrl: './register-new-collaborator.component.html',
  styleUrls: ['./register-new-collaborator.component.scss'],
})
export class RegisterNewCollaboratorComponent implements OnInit {
  public collaboratorForm: FormGroup;
  public listDataForms: any;
  public dataSource: ResultCollaborators;
  public editData: boolean = false;
  colaboradorValue: string;
  public currentDataCollaborators = new ResultCollaborators();
  catalogEspecialidades: CatalogoGestor[];
  catalogPuestos: CatalogoGestor[];
  catalogCentros: CatalogoGestor[];
  catalogGerenciasSr: CatalogoGestor[];
  catalogUbicaciones: CatalogoGestor[];
  catalogEsquemas: CatalogoGestor[];
  collaboratorType: any = [
    {
      label: 'INTERNO',
    },
    { label: 'EXTERNOS' },
  ];
  catalogSkills: CatalogoGestor[];
  catalogTeams: CatalogoGestor[];
  catalogEmpresas: CatalogoGestor[];
  catalogResponsables: CatalogoGestor[];
  isUpdate: boolean;

  dataInt: number;
  currentData: ResultCollaborators;
  info = new ResultCollaborators();

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  skilsData: any;
  botacoraData: any;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegisterNewCollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private catalogSandBox: CatalogsSandBox,
    private collaboratorsSandbox: CollaboratorSandbox,
    public dialog: MatDialog,
    private bitacoraSandbox: BitacoraComentariosSandBox
  ) {
    this.currentData =
      this.data.dataSelected === undefined ? this.info : this.data.dataSelected;
    this.createForm();
  }

  private createForm(): void {
    this.collaboratorForm = new FormGroup({
      collaboratorName: new FormControl(''),
      collaboratorNumber: new FormControl(''),
      commentsBusiness: new FormControl(''),
      email: new FormControl('', [Validators.email, Validators.required]),
      vpnIpF5: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern(
            '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'
          ),
        ]),
      }),
      bankIp: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern(
            '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'
          ),
        ]),
      }),
      collaboratorType: new FormControl(''),
      specialty: new FormControl(''),
      belongsCompany: new FormControl(''),
      assignedCenter: new FormControl(''),
      seniorMangement: new FormControl(''),
      assignedLeader: new FormControl(''),
      collaboratorLocation: new FormControl(''),
      collaboratorWorkSchemas: new FormControl(''),
      position: new FormControl(''),
      teams: new FormControl(''),
      skills: new FormControl(''),
    });

    this.listDataForms = [
      {
        label: 'Nombre del colaborador',
        placeHolder: 'Nombre del colaborador',
        controlName: 'collaboratorName',
        regex: '',
        icon: '',
        typeInput: 'text',
      },
      {
        label: 'Numero de colaborador',
        placeHolder: 'Numero de colaborador',
        controlName: 'collaboratorNumber',
        regex: '',
        icon: '',
        typeInput: 'tex',
      },
      {
        label: 'Comentario de negocio',
        placeHolder: 'Comentario de negocio',
        controlName: 'commentsBusiness',
        regex: '',
        icon: '',
        typeInput: 'text',
      },
    ];
  }

  private getDataForm(): ResultCollaborators {
    let dataCollaborator = this.collaboratorForm.controls;
    let titleSpaciality = this.catalogEspecialidades.find(
      (element) => element.id === dataCollaborator['specialty'].value
    );
    let titleEquipo = this.catalogTeams.find(
      (element) => element.id === dataCollaborator['teams'].value
    );
    let tituloGenrenciaSRData = this.catalogGerenciasSr.find(
      (element) => element.id === dataCollaborator['seniorMangement'].value
    );

    let tituloPuestoData = this.catalogPuestos.find(
      (element) => element.id === dataCollaborator['position'].value
    );

    let tituloEmpresaData = this.catalogEmpresas.find(
      (element) =>
        element.id === dataCollaborator['collaboratorWorkSchemas'].value
    );

    let tituloCentroData = this.catalogCentros.find(
      (element) => element.id === dataCollaborator['assignedCenter'].value
    );

    let liderData = this.catalogResponsables.find(
      (element) => element.id === dataCollaborator['assignedLeader'].value
    );

    let tituloUbicacionData = this.catalogUbicaciones.find(
      (element) => element.id === dataCollaborator['collaboratorLocation'].value
    );

    let tituloEsquemaData = this.catalogEsquemas.find(
      (element) =>
        element.id === dataCollaborator['collaboratorWorkSchemas'].value
    );

    let collaboratorNumber = dataCollaborator['collaboratorNumber'].value;
    return {
      idColaborador: '',
      idEquipo: dataCollaborator['teams'].value,
      tituloEquipo: '',
      idEspecialidad: dataCollaborator['specialty'].value,
      tituloEspecialidad: titleSpaciality?.titulo,
      nombre: dataCollaborator['collaboratorName'].value,
      idGerenciaSR: dataCollaborator['seniorMangement'].value,
      tituloGenrenciaSR: tituloGenrenciaSRData?.titulo,
      comentarioNegocio: dataCollaborator['commentsBusiness'].value,
      idPuesto: dataCollaborator['position'].value,
      tituloPuesto: tituloPuestoData?.titulo,
      fulltime: 100.0,
      tipoColaborador: dataCollaborator['collaboratorType'].value,
      tituloTipoColaborador: dataCollaborator['collaboratorType'].value,
      idEmpresa: dataCollaborator['collaboratorWorkSchemas'].value,
      tituloEmpresa: tituloEmpresaData?.titulo,
      numColaborador: parseInt(collaboratorNumber),
      idCentro: dataCollaborator['assignedCenter'].value,
      tituloCentro: tituloCentroData?.titulo,
      correo: dataCollaborator['email'].value,
      idLider: dataCollaborator['assignedLeader'].value,
      lider: liderData?.titulo,
      idUbicacion: dataCollaborator['collaboratorLocation'].value,
      tituloUbicacion: tituloUbicacionData?.titulo,
      idEsquema: dataCollaborator['collaboratorWorkSchemas'].value,
      tituloEsquema: tituloEsquemaData?.titulo,
      ipBanco: dataCollaborator['bankIp'].value,
      ipVPN: dataCollaborator['vpnIpF5'].value,
      solicitante: 'S/D',
      contador: 0,
      skills: '',
    };
  }

  public newCollaborator(event: any) {
    event.preventDefault();

    let dataCollaborator = this.collaboratorForm.controls;

    let listSkils = dataCollaborator['skills'].value;

    let infoNewCollaborator: ResultCollaborators = this.getDataForm();

    let arraySkillsPrueba = new Array();

    if (listSkils) {
      if (listSkils.length > 0 && this.catalogSkills) {
        for (const item in listSkils) {
          console.log('r1: ', listSkils[item]);
          let dataResul = this.catalogSkills.find(
            (element) => element.id === listSkils[item]
          );

          arraySkillsPrueba.push(dataResul?.titulo);
        }
      }
    }

    let castData: ResultCollaborators = {
      ...infoNewCollaborator,
      skills: arraySkillsPrueba,
    };

    const dialogRefUpdate = this.dialog.open(DeleteCollaboratorComponent, {
      closeOnNavigation: false,
      hasBackdrop: true,
      data: {
        typeOperation: 'create',
        buttonName: 'Crear Colaborador',
        name: 'Crear Colaborador',
        dataSelected: castData,
        listSkils,
        bitacoraDetail: this.botacoraData,
      },
    });

    dialogRefUpdate.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(
          '🚀 ~ file: register-new-collaborator.component.ts:255 ~ RegisterNewCollaboratorComponent ~ dialogRefUpdate.afterClosed ~ result:',
          result
        );
        this.getBitacora();
        //this.animal = result;
        this.dialogRef.close();
      }
    });
  }

  updateSkills(dataToSkills: SkillsToCollaborators, meesage: string): void {
    this.collaboratorsSandbox
      .updateSkillsAdCollaborators(dataToSkills)
      .subscribe((res) => {
        new Toast(meesage, {
          position: 'bottom',
        });
      });
  }

  operationAbort() {
    this.dialogRef.close('delete');
  }

  udateCollaborartor(): ResultCollaborators {
    let dataCollaborator = this.collaboratorForm.controls;
    let listSkils = dataCollaborator['skills'].value;

    let arraySkillsPrueba = new Array();

    if (listSkils) {
      if (listSkils.length > 0 && this.catalogSkills) {
        for (const item in listSkils) {
          let dataResul = this.catalogSkills.find(
            (element) => element.id === listSkils[item]
          );

          arraySkillsPrueba.push(dataResul?.titulo);
        }
      }
    }

    let data = this.getDataForm();

    let castData: ResultCollaborators = {
      ...data,
      idColaborador: this.data.dataSelected.idColaborador,
      skills: arraySkillsPrueba,
    };

    return castData;
  }
  confirmOperation(typeOperation: string) {
    switch (typeOperation) {
      case 'bitacora':
        const dialogRefBitacora = this.dialog.open(
          DeleteCollaboratorComponent,
          {
            closeOnNavigation: false,
            hasBackdrop: true,
            data: {
              showDetail: true,
              typeOperation: 'bitacora',
              buttonName: '',
              name: 'Bitácora Colaborador',
              dataSelected: this.data.dataSelected,
              bitacoraDetail: this.botacoraData,
            },
          }
        );

        dialogRefBitacora.afterClosed().subscribe((result) => {
          this.getBitacora();
          this.collaboratorsSandbox.realodData.emit(true);
          if (result !== undefined) {
            //this.animal = result;
            this.dialogRef.close();
          }
        });
        break;
      case 'edit':
        this.isUpdate = true;
        this.collaboratorForm.controls['collaboratorName'].enable();
        this.collaboratorForm.controls['collaboratorNumber'].enable();
        this.collaboratorForm.controls['commentsBusiness'].enable();
        this.collaboratorForm.controls['email'].enable();
        this.collaboratorForm.controls['vpnIpF5'].enable();
        this.collaboratorForm.controls['bankIp'].enable();
        this.collaboratorForm.controls['collaboratorType'].enable();
        this.collaboratorForm.controls['specialty'].enable();
        this.collaboratorForm.controls['belongsCompany'].enable();
        this.collaboratorForm.controls['assignedCenter'].enable();
        this.collaboratorForm.controls['seniorMangement'].enable();
        this.collaboratorForm.controls['assignedLeader'].enable();
        this.collaboratorForm.controls['collaboratorLocation'].enable();
        this.collaboratorForm.controls['collaboratorWorkSchemas'].enable();
        this.collaboratorForm.controls['position'].enable();
        this.collaboratorForm.controls['teams'].enable();
        this.collaboratorForm.controls['skills'].enable();
        break;
      case 'delete':
        const dialogRef = this.dialog.open(DeleteCollaboratorComponent, {
          closeOnNavigation: false,
          hasBackdrop: true,
          data: {
            typeOperation: 'delete',
            buttonName: 'Eliminar Colaborador',
            name: 'Eliminar Colaborador',
            dataSelected: this.data.dataSelected,
            bitacoraDetail: this.botacoraData,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          this.collaboratorsSandbox.realodData.emit(true);
          if (result !== undefined) {
            //this.animal = result;
            this.getBitacora();
            this.dialogRef.close();
          }
        });

        /*         data = { isEdit: false, data: {} };
        this.dialogRef.close(data); */
        break;
      case 'update':
        let dataCollaborator = this.collaboratorForm.controls;
        let listSkils = dataCollaborator['skills'].value;
        let data = this.udateCollaborartor();

        const dialogRefUpdate = this.dialog.open(DeleteCollaboratorComponent, {
          closeOnNavigation: false,
          hasBackdrop: true,
          data: {
            typeOperation: 'update',
            buttonName: 'Guardar Colaborador',
            name: 'Editar Colaborador',
            dataSelected: data,
            listSkils,
            bitacoraDetail: this.botacoraData,
          },
        });

        dialogRefUpdate.afterClosed().subscribe((result) => {
          this.collaboratorsSandbox.realodData.emit(true);
          if (result !== undefined) {
            //this.animal = result;
            this.getBitacora();
            this.dialogRef.close();
          }
        });
        //. this.udateCollaborartor();
        break;

      default:
        break;
    }
  }

  setFormData() {
    let infoSelected = {
      ...this.data.dataSelected,
      skills:
        this.data.dataSelected.skills === undefined
          ? null
          : this.data.dataSelected.skills.split(', '),
    };
    if (this.data) {
      if (this.data.isEdit) {
        this.collaboratorForm.controls['collaboratorName'].setValue(
          infoSelected.nombre
        );
        this.collaboratorForm.controls['collaboratorName'].disable();
        this.collaboratorForm.controls['collaboratorNumber'].setValue(
          infoSelected.numColaborador
        );
        this.collaboratorForm.controls['collaboratorNumber'].disable();
        this.collaboratorForm.controls['commentsBusiness'].setValue(
          infoSelected.comentarioNegocio
        );
        this.collaboratorForm.controls['specialty'].disable();
        this.collaboratorForm.controls['commentsBusiness'].disable();
        this.collaboratorForm.controls['email'].setValue(infoSelected.correo);
        this.collaboratorForm.controls['email'].disable();
        this.collaboratorForm.controls['vpnIpF5'].setValue(infoSelected.ipVPN);
        this.collaboratorForm.controls['vpnIpF5'].disable();
        this.collaboratorForm.controls['bankIp'].setValue(infoSelected.ipBanco);
        this.collaboratorForm.controls['bankIp'].disable();
        this.collaboratorForm.controls['collaboratorType'].setValue(
          infoSelected.tipoColaborador
        );
        this.collaboratorForm.controls['collaboratorType'].disable();
        this.collaboratorForm.controls['belongsCompany'].disable();
        this.collaboratorForm.controls['assignedCenter'].disable();
        this.collaboratorForm.controls['seniorMangement'].disable();
        this.collaboratorForm.controls['assignedLeader'].disable();
        this.collaboratorForm.controls['collaboratorLocation'].disable();
        this.collaboratorForm.controls['collaboratorWorkSchemas'].disable();
        this.collaboratorForm.controls['position'].disable();
        this.collaboratorForm.controls['teams'].disable();
        this.collaboratorForm.controls['skills'].disable();
      } else {
        this.collaboratorForm.reset;
      }
    }
  }

  getBitacora() {
    this.bitacoraSandbox.getInciativas().subscribe((res) => {
      this.botacoraData = res;
    });
  }

  ngOnInit(): void {
    this.getBitacora();
    if (this.data.isEdit === true) {
      this.setFormData();
    }

    this.processRequestCatalogs('especialidades');
    this.processRequestCatalogs('puestos');
    this.processRequestCatalogs('ubicaciones');
    this.processRequestCatalogs('esquemas');
    this.processRequestCatalogs('gerenciassr');
    this.processRequestCatalogs('centros');
    this.processRequestCatalogs('skills');
    this.processRequestCatalogs('equipos');
    this.processRequestCatalogs('empresas');
    this.processRequestCatalogs('gerentesresponsables');
  }

  processRequestCatalogs(stringCatalogVale: string) {
    this.catalogSandBox.get(stringCatalogVale).subscribe((response) => {
      switch (stringCatalogVale) {
        case 'especialidades':
          this.catalogEspecialidades = response;
          break;
        case 'ubicaciones':
          this.catalogUbicaciones = response;
          break;
        case 'esquemas':
          this.catalogEsquemas = response;
          break;
        case 'gerenciassr':
          this.catalogGerenciasSr = response;
          break;
        case 'centros':
          this.catalogCentros = response;
          break;
        case 'skills':
          this.catalogSkills = response;

          if (this.data.dataSelected?.skills) {
            let skillsInfo = this.data.dataSelected.skills.split(', ');

            let arraySkillsPrueba = new Array();

            if (skillsInfo) {
              if (skillsInfo.length > 0 && this.catalogSkills) {
                for (const item in skillsInfo) {
                  let dataResul = this.catalogSkills.find(
                    (element) => element.titulo === skillsInfo[item]
                  );

                  arraySkillsPrueba.push(dataResul?.id);
                }
              }
            }

            this.skilsData = arraySkillsPrueba;
          }

          break;
        case 'equipos':
          this.catalogTeams = response;
          break;
        case 'empresas':
          this.catalogEmpresas = response;
          break;
        case 'gerentesresponsables':
          this.catalogResponsables = response;
          break;
        case 'puestos':
          this.catalogPuestos = response;
          break;
        default:
          break;
      }
    });
  }
}
