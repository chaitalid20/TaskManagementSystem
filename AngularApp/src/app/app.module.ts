import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {​​​​​ ReactiveFormsModule, FormsModule}​​​​​ from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginService } from '../services/login.service';
import {​​HttpClientModule}​​ from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { CanActiveGuard } from './components/common/can-active.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CreateTaskComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AgGridModule,
  ],
  providers: [LoginService, CanActiveGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
