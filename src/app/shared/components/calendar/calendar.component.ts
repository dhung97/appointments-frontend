import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  @Output() dateSelected = new EventEmitter<Date>();
  minDate!:Date;
  selected!: Date;

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.minDate = new Date();
  }

  selectedChange(date: Date){
    this.selected = date;
    this.dateSelected.emit(date);
  }
}
