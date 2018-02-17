import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Task} from '../task';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Localhost} from '../localhost';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
/*import 'rxjs/add/observable/throw';

const mergeAuthToken = (options) => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    options.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${jwt}`
    });
    return {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`
      }, withCredentials: true
    };
  }
  return options;
};*/

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})



export class TaskListComponent implements OnInit {

  task: Task;
  tasks: Task[] = [];
  localhost: Localhost = new Localhost();




  constructor(private http: HttpClient) {
  }


  getTaskList(){

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' +  localStorage.getItem('jwt'));
    var options = {headers: headers, withCredentials: true};
    return this.http.get(this.localhost.taskList, options);
  }

  ngOnInit() {
    this.getTaskList().subscribe((data: Task[]) => this.tasks = data);

  }

  @Input() selectedTaskList: Task;
  @Output() taskSelect = new EventEmitter<Task>();

  selectTask(task: Task) {
    this.taskSelect.emit(task);
    this.selectedTaskList = task;
  }

}
