import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { appConfig } from '../common/app.config';
import { HttpClient } from '@angular/common/http';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
id: any;
  //Get All Task data from API
  getAllTasks():Observable<Task[]>{
    return this.http.get<Task[]>(appConfig.apiUrl)
  }

  //Update Task inn Db


  updateTask(values: Task): Observable<Task>{
    debugger;
    return this.http.put<Task>(appConfig.apiUrl + '/'+values.id, values);
    //return this.http.put<Task>(`${appConfig.apiUrl}/${values.id}`, values)
      //.pipe(
        //catchError(this.handleError('updateHero', hero))
      //);
  }

  //detelte task
  deleteTask(id: any){
    return this.http.delete(appConfig.apiUrl + '/'+ id);
  }
}
