import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../services/paciente.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent {
  userid: any = "";
  name: any = "" ;
  patients: any[] =[];

  constructor(private pacienteService: PacienteService,
    private route: ActivatedRoute){}


    ngOnInit(): void {  
       //Obtiene id desde url
      this.userid= this.route.snapshot.paramMap.get('id');
      this.updateData();
    }

    updateData(){

      //Obtiene nombre desde /medico/id
      this.pacienteService.getMedico(this.userid).subscribe({
        next: (data: any) => {
          this.name = data;
          
  
        },
        error: (e: any) => {
          const errorMessage = e.message || 'Error desconocido';
          console.log(errorMessage);
        }
      });

      //Obtiene pacientes desde /paciente/medico/id
      this.pacienteService.getPacienteByMedico(this.userid).subscribe({
        next: (patients: any[]) => {
          this.patients = patients;
        },
        error: (e: any) => {
          const errorMessage = e.message || 'Error desconocido';
          console.log(errorMessage);
        },
        complete: () => console.log('done'),
      });
    }
}
