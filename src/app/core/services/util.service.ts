import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private snackBar: MatSnackBar) { }

  formatDate(date: Date){
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  createSnackBar(message: string, action:string = 'Aceptar', config:MatSnackBarConfig = {}){
    return this.snackBar.open(message, action, config);
  }
}
