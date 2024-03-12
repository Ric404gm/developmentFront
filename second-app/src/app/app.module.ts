import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CocacolaComponent } from './cocacola/cocacola.component';
import { PepsiComponent } from './pepsi/pepsi.component';
import { CambiacolorletraDirective } from './directives/cambiacolorletra.directive';
import { CambiatoupperPipe } from './pipes/cambiatoupper.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CocacolaComponent,
    PepsiComponent,
    CambiacolorletraDirective,
    CambiatoupperPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
