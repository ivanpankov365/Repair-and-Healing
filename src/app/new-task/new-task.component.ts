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


  constructor(private http: HttpClient) {
    console.log(this.task);
  }

  newTaskFlag: boolean;
  newTaskAddFlag: boolean;

  newTask() {
    this.newTaskFlag = true;
    this.newTaskAddFlag = false;
  }

  postTask(task: Task) {
    return this.http.post(this.localhost.addNewTask, task);
  }

  receivedTask: Task; // ответ от сервера
  addNewTask(task: Task) {
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

  taskIsValid: boolean;
  newTaskIsValid(){
    this.taskIsValid = true;
  }

  build: string;
  room: string;
  roomNumber: string;

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
