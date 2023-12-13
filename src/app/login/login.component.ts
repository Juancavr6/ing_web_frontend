import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { AssistService } from '../services/assist.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  tipo:any = ""
  hide:boolean = true;
  userid: string = '';
  pass: string  = '';
  acceso:any = "enviar";

  constructor(private loginService: LoginService, 
              private auxService: AssistService) 
              { 
                this.auxService.getUserType.subscribe(msg => this.tipo = msg)
               }

  ngOnInit() {

  }

  onSubmit() {

    this.loginService.getPassword(this.userid,this.tipo).subscribe({
      next: (data: any) => {
        if(<string> this.pass == <string> data) {this.acceso = "correcto";}
        else {this.acceso = "fallo"+this.pass;}
        

      },
      error: (e: any) => {
        const errorMessage = e.message || 'Error desconocido';
        this.acceso = errorMessage
      }
    });

  }

 
}

