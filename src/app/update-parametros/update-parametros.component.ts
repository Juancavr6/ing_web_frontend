import { Component, OnInit } from '@angular/core';
import { Parametros } from '../parametros';
import { PacienteService } from '../services/paciente.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-update-parametros',
  templateUrl: './update-parametros.component.html',
  styleUrls: ['./update-parametros.component.css']
})
export class UpdateParametrosComponent {
   parametros: Parametros = new Parametros();
   create = true;
   userid: any;
   constructor(private pacienteService: PacienteService,
               private route: ActivatedRoute,
               private _location: Location,
               private snackbar: MatSnackBar,){}

  ngOnInit(){
    //Obtiene id desde url
    this.userid= this.route.snapshot.paramMap.get('id');

    //Obtiene parametros desde /paciente/id/parametros
    this.pacienteService.getParametros(this.userid).subscribe({
      next: (params: any) => {
        this.parametros = <Parametros> params;
      },
      error: (e: any) => {
        const errorMessage = e.message || 'Error desconocido';
        console.log(errorMessage);
      },
      complete: () => console.log('done'),
    });
   }

  onSubmit(){

    //Actualiza parametros para paciente id
    this.pacienteService.updateParametros(this.parametros).subscribe({
      next: (any) => {
        this.snackbar.open('Parámetros actualizados', '', {
          duration: 3000
        });
      },
      error: (e: any) => {
        this.snackbar.open('ERROR: No se ha podido actualizar', '', {
          duration: 3000
        });
      }
    });
   }

  //Carga el componente anterior
  back() {
    this._location.back();
  }
}
