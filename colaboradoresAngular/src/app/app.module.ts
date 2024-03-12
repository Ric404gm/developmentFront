import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LeftMenuComponent } from './views/left-menu/left-menu.component';
import { SearchComponent } from './components/search/search.component';
import { materialComponents } from './shared/constants/componentsMaterial';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';
import { RegisterNewCollaboratorComponent } from './components/register-new-collaborator/register-new-collaborator.component';
import { TitleComponent } from './components/title/title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridColaboratorsComponent } from './views/grid-colaborators/grid-colaborators.component';
import { GridAssignmentsComponent } from './views/grid-assignments/grid-assignments.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProgressBarModule } from './components/progress-bar/progress-bar.module';
import { RegisterNewAssignmentComponent } from './components/register-new-assignment/register-new-assignment.component';
import { DeleteCollaboratorComponent } from './components/delete-collaborator/delete-collaborator.component';
import { GriidInitiativesComponent } from './views/griid-initiatives/griid-initiatives.component';
import { DialogInitiativesComponent } from './views/griid-initiatives/dialog-initiatives/dialog-initiatives.component';
import { AsignacionesComfirmComponent } from './components/asignaciones-comfirm/asignaciones-comfirm.component';
import { IniciativasConfirmComponent } from './components/iniciativas-confirm/iniciativas-confirm.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { NumberDirective } from './shared/directives/number-only.directive';


export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Elementos por página:';

  return customPaginatorIntl;
}


@NgModule({
  exports: [],
  declarations: [
    AppComponent,
    LeftMenuComponent,
    SearchComponent,
    ColaboradoresComponent,
    RegisterNewCollaboratorComponent,
    TitleComponent,
    GridColaboratorsComponent,
    GridAssignmentsComponent,
    GriidInitiativesComponent,
    RegisterNewAssignmentComponent,
    DeleteCollaboratorComponent,
    DialogInitiativesComponent,
    AsignacionesComfirmComponent,
    IniciativasConfirmComponent,
    NumberDirective
  ],
  imports: [
    ...materialComponents,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProgressBarModule,
    FormsModule,
    
    


  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
/*     {
			provide: HTTP_INTERCEPTORS,
			useClass: ApiWebInterceptor,
			multi: true
		}, */
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
