import { Component, OnInit } from '@angular/core';
import { CuentaService } from '../services/cuenta.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'; 
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit  {

  displayedColumns = ['id', 'ccc', 'balance', 'view','delete'];
  accounts: JSON[] =[];
  element = {};
  dataSource = new MatTableDataSource(this.accounts);
  
  constructor(private cuentaService: CuentaService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog) { }
    
  ngOnInit(): void {  
    this.updateData();
  }

  updateData(){
    this.cuentaService.getAccounts().subscribe({
      next: (accounts: JSON[]) => {
        console.log(accounts);
        this.accounts = accounts;
        this.dataSource.data=this.accounts;
      },
      error: (e: any) => {
        this.snackbar.open('Error getting the cuentas '+e.error, '', {
          duration: 3000
        });
      },
      complete: () => console.log('done'),
    });
  }
  delete(id: number){
    this.cuentaService.deleteAccount(id).subscribe({
      next: () => {
        this.updateData();
      },
      error: (e: any) => {
        this.snackbar.open('Error deleting the cuenta '+e.error, '', {
          duration: 3000
        });
      },
      complete: () => console.log('done'),
    });
  }

  confirmDeletion(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { title: 'Cuenta ' + id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
    });
  }
}