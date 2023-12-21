import { Component } from '@angular/core';
import { AssistService } from '../services/assist.service';


@Component({
  selector: 'app-acces',
  templateUrl: './acces.component.html',
  styleUrls: ['./acces.component.css']
})
export class AccesComponent {

  constructor(private auxService: AssistService) { }
  
  //Cambian el tipo de login a paciente o medico
  changeType(type: any){
      this.auxService.setUserType(type)
  }
    
  


}
