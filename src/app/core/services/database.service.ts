import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Appointment, GetAppointmentQuery } from '../interfaces/iDatabase';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getAppointments(){
    return new Promise<void>((resolve, reject) => {
      try {
        this.http.get(`${environment.URL}/${environment.ENDPOINT}`, {
          headers:{
            "ngrok-skip-browser-warning": "69420"
          }
        }).subscribe((res:any) => {
          resolve(res)
        },
        error => {
          reject(error);
        })

      } catch (error) {
        reject(error);
      }
    })
  }

  createAppointments(data: Appointment){
    return new Promise<void>((resolve, reject) => {
      try {
        this.http.post(`${environment.URL}/${environment.ENDPOINT}`, data,{
          headers:{
            "ngrok-skip-browser-warning": "69420"
          }
        }).subscribe((res:any) => {
          resolve(res)
        },
        error => {
          reject(error);
        })

      } catch (error) {
        reject(error);
      }
    })
  }

  checkExistence(query: string){
    return new Promise<GetAppointmentQuery>((resolve, reject) => {
      const headers = {
        query,
        "ngrok-skip-browser-warning": "69420"
      }
      try {
        this.http.get(`${environment.URL}/${environment.ENDPOINT}/exist/`, {headers}).subscribe((res:any) => {
          resolve(res)
        },
        error => {
          reject(error);
        })

      } catch (error) {
        reject(error);
      }
    })
  }
}
