import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssistService {
  private userType = new BehaviorSubject('paciente')
  getUserType = this.userType.asObservable()

  constructor() { }

  setUserType(type:any){
    
    this.userType.next(type)
  }
}
