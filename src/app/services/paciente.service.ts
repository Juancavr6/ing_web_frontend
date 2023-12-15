import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

    url = this.baseUrl + '/paciente';
    
    getParametros(id: any):any {
      return this.httpClient.get<JSON>(this.url + '/' + id + '/parametros')
      ;
    }

    getPaciente(id: any):any {
      return this.httpClient.get<JSON>(this.url + '/' + id )
      ;
    }
}
