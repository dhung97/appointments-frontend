import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../core/services/database.service';
import { AuthService } from '../../../core/services/auth.service';
import { HOURS } from '../../../core/const/hours.metadata';
import { User } from '../../../core/interfaces/iCredentials';
import { UtilService } from '../../../core/services/util.service';
import { Appointment } from '../../../core/interfaces/iDatabase';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NavService } from '../../../core/services/nav.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  credentials!: User;
  unableDates: Date[] = [];
  hours: string[] = HOURS;
  currentDate: string = '';
  currentHour: string = '';
  currentTime: string = 'p.m.';
  appointments: Appointment[] = [];
  hoursAvailables: string[] = [];

  constructor(
    private _authService: AuthService,
    private _databaseService: DatabaseService,
    private _utilService: UtilService,
    private _navService: NavService) {

  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    const backup = localStorage.getItem('credentials');
    this.credentials = this._authService.credentials || JSON.parse(backup!);
    this.refreshAppointments();
  }

  async refreshAppointments(){
    await this._databaseService.getAppointments().then((res: any) => {
      this.appointments = res.appointments;
      console.log(this.appointments)

    }).catch((error) => {
      console.error(error);
    });
  }

  dateSelected(date: Date) {
    this.currentDate = this._utilService.formatDate(date);
    this.checkHoursAvailables();
  }

  selectHour(hour: string){
    this.currentHour = hour;
  }

  selectTime(status: MatSlideToggleChange){
    if(status.checked){
      this.currentTime = 'a.m.'
    }else{
      this.currentTime = 'p.m.'
    }
  }

  async checkAvailability(){
    const date = `${this.currentDate} ${this.currentHour} ${this.currentTime}`;
    if(this.currentDate && this.currentHour && this.currentTime){
      this._databaseService.checkExistence(date).then(response => {
        const data = {
          firstname: this.credentials.firstname,
          lastname: this.credentials.lastname,
          phone: this.credentials.phone,
          date
        }

        this._databaseService.createAppointments(data).then(response => {
          this.refreshAppointments();
          this._utilService.createSnackBar('Su cita ha sido agendada con éxito').onAction().subscribe(action => {
            this.restartState();
          });
        })
      })
      .catch(error => {
        this.refreshAppointments();
        this._utilService.createSnackBar('Disculpe, ya existe una cita agendada para la fecha y hora solicitada');
      });

    }else{
      this.refreshAppointments();
      this._utilService.createSnackBar('Por favor verifique sus opciones marcadas');

    }
  }

  checkHoursAvailables(){
    const coincidences = this.appointments.filter(appointment => appointment.date.includes(this.currentDate));
    this.hoursAvailables = coincidences.map( coincidence => coincidence.date.split(' ')[1]);
  }

  restartState(){
    localStorage.removeItem('credentials');
    this._navService.navigateTo('');
  }
}
