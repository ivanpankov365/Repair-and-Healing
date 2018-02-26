import {Component, OnInit} from '@angular/core';
import {Task} from '../task';
import {HttpClient} from '@angular/common/http';
import {Localhost} from '../localhost';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {

  task: Task = new Task();
  localhost: Localhost = new Localhost();
  newTaskFlag: boolean;
  newTaskAddFlag: boolean;
  receivedTask: Task; // ответ от сервера
  build: string;
  room: string;
  roomNumber: string;


  constructor(private http: HttpClient) {
    console.log(this.task);
  }


  postTask(task: Task) {
    return this.http.post(this.localhost.addNewTask, task);
  }



  onSubmit(task: Task){

    this.newTaskFlag = false;
    this.newTaskAddFlag = true;
    task.roomNumber = this.roomNumber + this.build + this.room;
       this.postTask(task).subscribe(
      (data: Task) => {
        this.receivedTask = data;
      },
      error => console.log(error)
    );

  }

}
