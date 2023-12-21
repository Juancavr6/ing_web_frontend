import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PacienteService } from '../services/paciente.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class CalendarComponent  {
  @ViewChild(MatCalendar) calendar: MatCalendar<Date>;
  userid: any = "";
  events: any[] = [];
  selected_event = '';

  selected: Date | null = null;
  
  new_fecha: any;
  new_descripcion: any;

  constructor(private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar){}

    ngOnInit(): void {  
      //Obtiene id desde url
      this.userid= this.route.snapshot.paramMap.get('id');
      this.updateData();
      
    }

    onSubmit(){
      //Crea objeto evento
      this.new_fecha.setHours(12);
      let event = {
        "nombre":"Evento médico",
        "descripcion":this.new_descripcion,
        "fecha":this.new_fecha,
        "paciente":{
          id:this.userid
        }
      }

      //Crea evento con paciente = userid
      this.pacienteService.addEventoPaciente(<Object>event).subscribe({
        next: (any) => {
          this.snackbar.open('Evento creado', '', {
            duration: 3000
          });
        },
        error: (e: any) => {
          const errorMessage = e.message || 'Error desconocido';
          console.log(errorMessage);
          this.snackbar.open('ERROR: No se ha podido crear', '', {
            duration: 3000
          });
        }
      });
    }

    updateData(){

      //Obtiene eventos por paciente desde /evento/paciente/id
      this.pacienteService.getEventoByPaciente(this.userid).subscribe({
        next: (events: any[]) => {
          this.events = events;
          
        },
        error: (e: any) => {
          const errorMessage = e.message || 'Error desconocido';
          console.log(errorMessage);
        },
        complete: () => console.log('done'),
      });
    }

    //Establece css para cada dia del calendario
    dateClass() {
      return (date: Date): MatCalendarCellCssClasses => {

          if (this.getEventDates().includes(this.getDateString(date))) {
            return 'class-verde';
          } else {
            return '';
          }
      };
    }

    //Comprueba si el dia seleccionado es un evento y muestra descripción
    dateChanged(event:any){
      this.selected_event = '';
      for (const event of this.events) {
        let date : Date = new Date(event.fecha);
        if (this.selected.getMonth() == date.getMonth() && this.selected.getDate() == date.getDate()){
          this.selected_event = event.descripcion;
        }
      }
      this.calendar.updateTodaysDate();
    }

    //Actualiza la vista del calendario
    refresh(){
      this.calendar.updateTodaysDate();
      this.updateData();
      this.calendar.updateTodaysDate();
    }
    
    //Extrae la fechas de los eventos en formato MM-DD
    getEventDates(){
      let dates : any [] = [] ;
      for (const event of this.events) {
        let date : Date = new Date(event.fecha);
        dates.push(this.getDateString(date));
      }
      return dates;
    }

    //Formatea Objeto Date a MM-DD
    getDateString(date:Date){
      
      return date.getMonth()+"-"+date.getDate();
    }

}
