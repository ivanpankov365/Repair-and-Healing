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
export class MasterBranchComponent{

  master: Master = new Master();
  login: string;
  password: string;
  localhost: Localhost = new Localhost();

  constructor(private http: HttpClient) {
  }

  postMaster(login: string){
    var headers = new HttpHeaders().set('Authorization', 'Bearer ' +
      localStorage.getItem('jwt'));
    var options = {headers: headers, withCredentials: true};
    return this.http.post(this.localhost.checkMaster, login, options);
  }


  masterVerify: Master; // ответ от сервера
  loginVerify: boolean;
  masterCheckFlag: boolean;

  loginPost(login: string, password: string) {
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    var options = {headers: headers};
    const body = {
      email: login,
      password: password,
    };
    this.http.post(this.localhost.login, body, options).subscribe((data) => {
        localStorage.setItem('jwt', data['token']);
        if (data['role'] == '[MASTER]') {
          this.loginVerify = true;
          this. postMaster(login).subscribe((data : Master)=> {
            console.log('POOOOOOOOint')
            this.masterVerify = data;
            console.log(this.master);
          });
        }
      }, (err) => {
        console.log(err.status);
        if (err.status == 403) {
          this.masterVerify = null;
        }
      }
    );

  }

  masterCheck(login: string, password: string) {
    this.masterCheckFlag = true;
    this.loginPost(login, password);
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

  deleteTaskCheck(){
    this.selectedTask = null;
    this.deleteTaskFlag = !this.deleteTaskFlag;
  }

}
