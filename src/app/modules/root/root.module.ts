import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

const routes: Routes = [
  { path: '', component: IndexComponent}
]

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AngularMaterialModule
  ]
})
export class RootModule { }
