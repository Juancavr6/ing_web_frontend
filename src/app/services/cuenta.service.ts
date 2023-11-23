import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cuenta } from '../cuenta';
@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

    url = this.baseUrl + '/cuenta';
    
    getAccounts(){
      return this.httpClient.get<JSON[]>(this.url);
    }

    getAccount(id: number){
      return this.httpClient.get<JSON>(this.url + '/' + id);
    }
    
    createAccount(data: Cuenta){
      return this.httpClient.post(this.url, data)
    }

    updateAccount(data: Cuenta){
      return this.httpClient.put(this.url, data)
    }

    deleteAccount(id: number){
      return this.httpClient.delete(this.url + '/' + id)
    }
}
