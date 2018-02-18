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
    console.log('token '+ options);
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
      }, (err) => {
        console.log(err.status);
        if (err.status == 403) {
         console.log('ERROR 403');
        }
      }

    );
  }

  @Input() master: Master;

  @Output() taskSelect = new EventEmitter<Task>();

  selectFlag: boolean;
  selectTask(task: Task) {

    this.selectFlag = true;


    this.taskSelect.emit(task);
  }


}
