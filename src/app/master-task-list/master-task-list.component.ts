import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../task';
import {Master} from '../master';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Localhost} from '../localhost';
import {RequestService} from '../request-service';

@Component({
  selector: 'app-master-task-list',
  templateUrl: './master-task-list.component.html',
  styleUrls: ['./master-task-list.component.css']
})
export class MasterTaskListComponent implements OnInit {

  task: Task;
  tasks: Task[] = [];
  localhost: Localhost = new Localhost();
  @Input() master: Master;
  @Output() taskSelect = new EventEmitter<Task>();
  selectFlag: boolean;

  constructor(private http: HttpClient) {
  }

  getTaskList() {
    let options = new RequestService();
    console.log('token '+ options);
    return this.http.get(this.localhost.taskList, options.getOptions());
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


  selectTask(task: Task) {
    this.selectFlag = true;
    this.taskSelect.emit(task);
  }


}
