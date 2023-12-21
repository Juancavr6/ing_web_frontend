import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../services/paciente.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent {

  displayedColumns = ['id', 'altura', 'peso', 'glucosa','frecuenciaCardiaca', 'presionSis', 'presionDia','colesterol'];
  dataSource:any ; 
  personalData:any ;
  userid: any = "";

  name:any;
  enfermedades: any[] = [];

  constructor(private pacienteService: PacienteService,
              private route: ActivatedRoute){}

  ngOnInit(): void {  
    this.userid= this.route.snapshot.paramMap.get('id');
    this.updateData();
  }

  updateData(){
    
    //Obtiene datos desde /paciente/id
    this.pacienteService.getPaciente(this.userid).subscribe({
      next: (params: any[]) => {
        this.personalData = Object.values(params);
        this.name = this.personalData [1];
        this.enfermedades = Object.values(this.personalData[7]);
      },
      error: (e: any) => {
        const errorMessage = e.message || 'Error desconocido';
        console.log(errorMessage);
      },
      complete: () => console.log('done'),
    });

    //Obtiene parametros desde /paciente/id/parametros
    this.pacienteService.getParametros(this.userid).subscribe({
      next: (params: any[]) => {
        this.dataSource = [params,this.getParamUmbral(Object.values(params))];
      },
      error: (e: any) => {
        const errorMessage = e.message || 'Error desconocido';
        console.log(errorMessage);
      },
      complete: () => console.log('done'),
    });

  }

  //Convierte var ennfermedades en string
  enfermedadesToString():string{
   let names = "";
    this.enfermedades.forEach((enf : any) => {
      names += Object.values(enf)[1];
      names += "\n" ;
    });

    return names;
  }

  //Valora los parametros segun un umbral establecido y asigna unicodes 
  getParamUmbral(p:any[]){
    let ranges = {'id':"", 'altura':"", 'peso':"", 'glucosa':"\u274C",'frecuenciaCardiaca':"\u274C", 'presionSis':"\u274C", 'presionDia':"\u274C",'colesterol':"\u274C"}
   if(this.inRange(p[3], 70, 140) ){ranges.glucosa = "\u2713\uFE0F"}
   if(this.inRange(p[4], 60, 100) ){ranges.frecuenciaCardiaca = "\u2713\uFE0F"}
   if(this.inRange(p[5], 90, 120) ){ranges.presionSis = "\u2713\uFE0F"}
   if(this.inRange(p[6], 60, 80)  ){ranges.presionDia = "\u2713\uFE0F"}
   if(this.inRange(p[7], 120, 200)){ranges.colesterol = "\u2713\uFE0F"}

   return ranges;
  }

 //Comprueba si el valor esta dentro de un rango
  inRange(value: number, rinit: number, rend: number): boolean {
    return value >= rinit && value <= rend;
}



}
