import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CollaboratorSandbox } from 'src/app/shared/sandbox/collaborators-sandbox';
import Toast from 'awesome-toast-component';
import { SkillsToCollaborators } from 'src/app/shared/interfaces/skillsToCollaboratos';
import { BitacoraComentariosSandBox } from 'src/app/shared/sandbox/bitacora-comentarios';
import { ProcessComentarioBitacora } from 'src/app/shared/interfaces/comentarios-bitacora';

@Component({
  selector: 'coppel-delete-collaborator',
  templateUrl: './delete-collaborator.component.html',
  styleUrls: ['./delete-collaborator.component.scss'],
})
export class DeleteCollaboratorComponent {
  commentToAction: string;
  public disbleButton: boolean = true;
  showDetail: boolean = true;
  messageButton: string = 'Mostrar Detalles';
  bitacoraData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteCollaboratorComponent>,
    private collaboratorSandbox: CollaboratorSandbox,
    private bitacoraSandbox: BitacoraComentariosSandBox
  ) {
    let dataCast = this.data.bitacoraDetail.filter((data) => {
      if (data.tipomodulo === 'COLABORADORES') {
        return data;
      }
    });

    this.bitacoraData = dataCast.filter((data) => {
      if (
        parseInt(data.idreferencia) === this.data.dataSelected.idColaborador
      ) {
        return data;
      }
    });

    // let data = res.filter((data) => {

    console.log(
      '🚀 ~ file: delete-collaborator.component.ts:16 ~ DeleteCollaboratorComponent ~ this.data:',
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

  onCommentChange() {}

  updateSkills(dataToSkills: SkillsToCollaborators, meesage: string): void {
    this.collaboratorSandbox
      .updateSkillsAdCollaborators(dataToSkills)
      .subscribe((res) => {
        new Toast(meesage, {
          position: 'bottom',
        });
      });
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

  deleteCollanorator(action: string) {
    console.log(
      '🚀 ~ file: delete-collaborator.component.ts:123 ~ DeleteCollaboratorComponent ~ deleteCollanorator ~ this.commentToAction:',
      this.commentToAction
    );

    switch (action) {
      case 'delete':
        if (
          this.commentToAction !== '' ||
          this.commentToAction !== null ||
          this.commentToAction !== undefined
        ) {
          let data: ProcessComentarioBitacora = {
            tipoaccion: 'ELIMINAR',
            tipomodulo: 'COLABORADORES',
            comentario: this.commentToAction,
            idusuario: 1,
            idreferencia: this.data.dataSelected.idColaborador.toString(),
            referenciavalor: this.data.dataSelected.nombre,
            jsonPayload: '',
          };

          this.createComment(data);

          this.collaboratorSandbox
            .deleteCollaborator(this.data.dataSelected.idColaborador)
            .subscribe(
              (res) => {
                console.log(
                  '🚀 ~ file: delete-collaborator.component.ts:22 ~ DeleteCollaboratorComponent ~ this.collaboratorSandbox.deleteCollaborator ~ res:',
                  res
                );
                this.dialogRef.close('deleted');
              },
              (error) => {
                new Toast(
                  `Ups, ocurrio un error al intentar eliminar el colaborador`,
                  {
                    position: 'bottom',
                  }
                );
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
            tipoaccion: 'EDITAR',
            tipomodulo: 'COLABORADORES',
            comentario: this.commentToAction,
            idusuario: 1,
            idreferencia: this.data.dataSelected.idColaborador.toString(),
            referenciavalor: this.data.dataSelected.nombre,
            jsonPayload: '',
          };

          this.createComment(data);

          let castData = { ...this.data.dataSelected, skills: '' };
          let listaSkill = this.data.listSkils;
          this.collaboratorSandbox.updateCollaborator(castData).subscribe(
            (response) => {
              let dataToSkills: SkillsToCollaborators = {
                idColaborador: this.data.dataSelected.idColaborador,
                listaSkill,
              };
              this.updateSkills(
                dataToSkills,
                'El colaborador fue editado exitosamente'
              );

              new Toast(`El colaborador fue creado exitosamente`, {
                position: 'bottom',
              });
              this.dialogRef.close('update');
            },
            (error) => {
              console.log(
                '🚀 ~ file: register-new-collaborator.component.ts:261 ~ RegisterNewCollaboratorComponent ~ this.collaboratorsSandbox.updateCollaborator ~ error:',
                error
              );
            }
          );
        }
        break;

      case 'create':
        let castDataNewCollaborator = { ...this.data.dataSelected, skills: '' };
        let listaSkillNewCollaborator = this.data.listSkils;
        if (
          this.commentToAction !== '' ||
          this.commentToAction !== null ||
          this.commentToAction !== undefined
        ) {
          this.collaboratorSandbox
            .createCollaborator(castDataNewCollaborator)
            .subscribe(
              (res) => {
                if (res.idColaborador) {
                  let dataToSkills: SkillsToCollaborators = {
                    idColaborador: res.idColaborador,
                    listaSkill: listaSkillNewCollaborator,
                  };

                  let data: ProcessComentarioBitacora = {
                    tipoaccion: 'AGREGAR',
                    tipomodulo: 'COLABORADORES',
                    comentario: this.commentToAction,
                    idusuario: 1,
                    idreferencia: res.idColaborador.toString(),
                    referenciavalor: this.data.dataSelected.nombre,
                    jsonPayload: '',
                  };

                  this.createComment(data);
                  this.updateSkills(
                    dataToSkills,
                    'El colaborador fue creado exitosamente'
                  );

                  this.dialogRef.close('create');
                }
              },
              (error) => {
                new Toast(`Ocurrio un error al crear colaborador`, {
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
