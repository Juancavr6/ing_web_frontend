import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CuentasComponent } from './cuentas/cuentas.component';
import { CreateCuentaComponent } from './create-cuenta/create-cuenta.component';

const routes: Routes = [
  { path: '', component: CuentasComponent },
  { path: 'cuentas', component: CuentasComponent },
  { path: 'create', component: CreateCuentaComponent },
  {path: 'cuenta/:id', component: CreateCuentaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
