import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const shared = [
  HeaderComponent,
  CalendarComponent,
  FooterComponent
]

@NgModule({
  declarations: [
    ...shared
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports:[
    ...shared
  ]
})
export class SharedModule { }
