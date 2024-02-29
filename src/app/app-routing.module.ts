import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './core/guards/Home.guard';

const routes: Routes = [
  {path:'login', loadChildren: ()=> import('./modules/auth/auth.module').then(m => m.AuthModule)},
  {path:'home', loadChildren: ()=> import('./modules/root/root.module').then(m => m.RootModule), canActivate: [HomeGuard]},
  {path:'**', pathMatch: 'full', redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
