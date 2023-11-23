import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CuentaService } from '../services/cuenta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuenta } from '../cuenta';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-cuenta',
  templateUrl: './create-cuenta.component.html',
  styleUrls: ['./create-cuenta.component.css']
})
export class CreateCuentaComponent {


  cuenta : Cuenta = new Cuenta();
  create: boolean = true;
  cuentaId: number = 0;
  constructor(private cuentaService: CuentaService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location) { }

    ngOnInit(): void {
      if (this.route.snapshot.paramMap.has('id')){
        this.cuentaId = Number(this.route.snapshot.paramMap.get('id'));
        this.create=false;
      }

      if (!this.create){
        this.cuentaService.getAccount(this.cuentaId).subscribe({
          next: (data: any) => {
            this.cuenta = <Cuenta> data;
          },
          error: (e: any) => {
            this.snackbar.open('Error communicating with the server', '', {
              duration: 3000
            });
          }
        });
      }

  }
  back() {
    this._location.back();
  }
  onSubmit(cuenta: Cuenta) {
    if (this.create){
        this.cuentaService.createAccount(this.cuenta).subscribe({
        next: (any) => {
          this.router.navigateByUrl('/cuentas');
            this.snackbar.open('Cuenta created ', '', {
            duration: 3000
            });
        },
        error: (e: any) => {
          this.snackbar.open('Error creating the cuenta: '+e.error, '', {
            duration: 3000
          });
        }
      });
    }else{
      this.cuentaService.updateAccount(this.cuenta).subscribe({
        next: (any) => {
          this.router.navigateByUrl('/cuentas');
            this.snackbar.open('Cuenta updated ', '', {
            duration: 3000
            });
        },
        error: (e: any) => {
          this.snackbar.open('Error updating the cuenta: '+e.error, '', {
            duration: 3000
          });
        }
      });
    }
    
  }
}
