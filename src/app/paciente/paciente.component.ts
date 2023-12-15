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
    

    this.pacienteService.getPaciente(this.userid).subscribe({
      next: (params: any[]) => {
        this.personalData = Object.values(params);
        this.name = this.personalData [1];
        this.enfermedades = Object.values(this.personalData[8]);
        console.log(this.personalData)
      },
      error: (e: any) => {
        const errorMessage = e.message || 'Error desconocido';
        console.log(errorMessage);
      },
      complete: () => console.log('done'),
    });

    this.pacienteService.getParametros(this.userid).subscribe({
      next: (params: any[]) => {
        console.log(this.getParamThreshold(Object.values(params)));
        this.dataSource = [params,this.getParamThreshold(Object.values(params))];
      },
      error: (e: any) => {
        const errorMessage = e.message || 'Error desconocido';
        console.log(errorMessage);
      },
      complete: () => console.log('done'),
    });

  }

  enfermedadesToString():string{
   let names = "";
    this.enfermedades.forEach((enf : any) => {
      names += Object.values(enf)[1];
      names += "\n" ;
    });

    return names;
  }

  getParamThreshold(p:any[]){
    let ranges = {'id':"", 'altura':"", 'peso':"", 'glucosa':"\u274C",'frecuenciaCardiaca':"\u274C", 'presionSis':"\u274C", 'presionDia':"\u274C",'colesterol':"\u274C"}
   if(this.inRange(p[3], 70, 140) ){ranges.glucosa = "\u2713\uFE0F"}
   if(this.inRange(p[4], 60, 100) ){ranges.frecuenciaCardiaca = "\u2713\uFE0F"}
   if(this.inRange(p[5], 90, 120) ){ranges.presionSis = "\u2713\uFE0F"}
   if(this.inRange(p[6], 60, 80)  ){ranges.presionDia = "\u2713\uFE0F"}
   if(this.inRange(p[7], 120, 200)){ranges.colesterol = "\u2713\uFE0F"}

   return ranges;
  }

  inRange(value: number, rinit: number, rend: number): boolean {
    return value >= rinit && value <= rend;
}



}
