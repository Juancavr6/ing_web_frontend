import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CuentasComponent } from './cuentas/cuentas.component';
import { CreateCuentaComponent } from './create-cuenta/create-cuenta.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { AccesComponent } from './acces/acces.component';
import { PacienteComponent } from './paciente/paciente.component';
import { UpdateParametrosComponent } from './update-parametros/update-parametros.component';
import { MedicoComponent } from './medico/medico.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  { path: 'login', component: AccesComponent },
  { path: 'login/paciente', component: LoginComponent },
  { path: 'login/medico', component: LoginComponent },
  { path: 'create', component: CreateCuentaComponent },
  { path: 'paciente/:id', component: PacienteComponent },
  { path: 'paciente/:id/update', component: UpdateParametrosComponent },
  { path: 'medico/:id', component: MedicoComponent },
  { path: 'paciente/:id/calendario', component: CalendarComponent },
  {path: 'cuenta/:id', component: CreateCuentaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
