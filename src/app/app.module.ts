import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


import { CuentasComponent } from './cuentas/cuentas.component';
import { CreateCuentaComponent } from './create-cuenta/create-cuenta.component'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { AccesComponent } from './acces/acces.component';
import { PacienteComponent } from './paciente/paciente.component';
import { UpdateParametrosComponent } from './update-parametros/update-parametros.component';
import { MedicoComponent } from './medico/medico.component';
import {MatListModule} from '@angular/material/list';
import { CalendarComponent } from './calendar/calendar.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CuentasComponent,
    CreateCuentaComponent,
    ConfirmDialogComponent,
    InicioComponent,
    LoginComponent,
    AccesComponent,
    PacienteComponent,
    UpdateParametrosComponent,
    MedicoComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
