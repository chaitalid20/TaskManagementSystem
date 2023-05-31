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
    return this.http.get<Task[]>(appConfig.apiUrl +'Task')
  }

  //Update Task inn Db
  updateTask(values: Task): Observable<Task>{
    let id = values.id;
    return this.http.put<Task>(appConfig.apiUrl + 'Task/update?id=' + values.id, values);
  }

  //detelte task
  deleteTask(id: any){
    return this.http.delete<Task>(appConfig.apiUrl + 'Task/delete?id=' + id);
  }
}
