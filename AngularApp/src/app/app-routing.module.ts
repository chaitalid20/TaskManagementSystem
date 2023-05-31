import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children:[
      { path:'login', loadChildren:() => import('./components/login/login.module')
      .then(m =>m.LoginModule)},
      { path:'dashboard', loadChildren:() => import('./components/dashboard/dashboard.module')
      .then(m =>m.DashboardModule),},
      //canActivate:[authGuard]}
      { path:'create', loadChildren:() => import('./components/create-task/create-task.module')
      .then(m =>m.CreateTaskModule),}
    ]
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
