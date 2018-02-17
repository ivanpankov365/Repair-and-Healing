import {Component, OnInit} from '@angular/core';
import {Master} from '../master';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Admin} from '../admin';
import {Task} from '../task';
import {Localhost} from '../localhost';

@Component({
  selector: 'app-master-branch',
  templateUrl: './master-branch.component.html',
  styleUrls: ['./master-branch.component.css']
})
export class MasterBranchComponent {

  master: Master = new Master();
  localhost: Localhost = new Localhost();

  constructor(private http: HttpClient) {
    console.log(this.master);
  }

  postMaster(master: Master) {
    return this.http.post(this.localhost.checkMaster, master);
  }

  masterVerify: boolean; // ответ от сервера
  masterCheckFlag: boolean;

  loginPost(master: Master) {
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    var options = {headers: headers};
    const body = {
      email: master.login,
      password: master.password,
    };
    this.http.post(this.localhost.login, body, options).subscribe((data) => {
        localStorage.setItem('jwt', data['token']);
        if (data['role'] == '[MASTER]') {
          this.masterVerify = true;
        }
      }, (err) => {
        console.log(err.status);
        if (err.status == 403) {
          this.masterVerify = false;
        }
      }
    );

  }

  masterCheck(master: Master) {
    this.masterCheckFlag = true;
    this.loginPost(master);
  }

  selectedTask: Task;

  taskSelect(acceptTask: Task) {
    this.selectedTask = acceptTask;
  }

  removeTask(task: Task) {
    var headers = new HttpHeaders().set('Authorization', 'Bearer ' +
      localStorage.getItem('jwt'));
    var options = {headers: headers, withCredentials: true};
    return this.http.post(this.localhost.deleteTask, task, options);
  }

  task: Task;
  deleteTaskFlag: boolean;

  deleteTask(selectedTask: Task) {
    this.removeTask(this.selectedTask).subscribe(
      (data: Task) => {
        this.task = data;
        this.deleteTaskFlag = !this.deleteTaskFlag;
        this.selectedTask = null;
      },
      error => console.log(error)
    );

  }


}
