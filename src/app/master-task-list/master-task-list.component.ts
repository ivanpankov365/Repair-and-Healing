import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../task';
import {Master} from '../master';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Localhost} from '../localhost';

@Component({
  selector: 'app-master-task-list',
  templateUrl: './master-task-list.component.html',
  styleUrls: ['./master-task-list.component.css']
})
export class MasterTaskListComponent implements OnInit {

  task: Task;
  tasks: Task[] = [];
  localhost: Localhost = new Localhost();

  constructor(private http: HttpClient) {
  }

  getTaskList() {
    var headers = new HttpHeaders().set('Authorization', 'Bearer ' +
      localStorage.getItem('jwt'));
    var options = {headers: headers, withCredentials: true};
    return this.http.get(this.localhost.taskList, options);
  }

  count: number;

  ngOnInit() {
    this.count = 0;
    this.getTaskList().subscribe((data: Task[]) => {
        for (let task of data) {
          if (task.masterId == this.master.masterId) {
            this.tasks[this.count] = task;
            this.count = this.count + 1;
          }
        }
      }
    );
  }

  @Input() master: Master;
  @Output() taskSelect = new EventEmitter<Task>();

  selectTask(task: Task) {
    this.taskSelect.emit(task);
  }


}