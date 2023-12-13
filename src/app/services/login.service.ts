import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

    url = this.baseUrl + '/login';
    
    getPassword(id: any, tipo: any):any {
      return this.httpClient.get(this.url + '/' + tipo + '/' + id, { responseType: 'text' })
      ;
    }

}
