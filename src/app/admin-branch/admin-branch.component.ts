import {Component, OnInit} from '@angular/core';
import {Admin} from '../admin';
import {Task} from '../task';
import {Master} from '../master';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Localhost} from '../localhost';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



@Component({
  selector: 'app-admin-branch',
  templateUrl: './admin-branch.component.html',
  styleUrls: ['./admin-branch.component.css']
})
export class AdminBranchComponent {

  admin: Admin = new Admin();
  localhost: Localhost = new Localhost();
  token: string;
  role: string;

  constructor(private http: HttpClient) {
  }

  postAdmin(admin: Admin) {
    return this.http.post(this.localhost.checkAdmin, admin);
  }


  loginPost(admin: Admin) {
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    var options = {headers: headers};
    const body = {
      email: admin.login,
      password: admin.password,
    };
    this.http.post(this.localhost.login, body, options).subscribe((data) => {
        localStorage.setItem('jwt', data['token']);
        if (data['role'] == '[ADMIN]') {
          this.adminVerify = true;
        }
      }, (err) => {
        if (err.status == 403) {
          this.adminVerify = false;
        }
      }
    );


  }

  adminVerify: boolean; // ответ от сервера
  adminCheckFlag: boolean;

  adminCheck(admin: Admin) {
    this.adminCheckFlag = true;
    this.loginPost(admin);

  }


  taskListFlag: boolean;

  taskList() {
    this.taskListFlag = true;
    this.newMasterFlag = false;
    this.ready = false;
  }

  selectedTask: Task;
  taskSelectFlag: boolean;

  taskSelect(acceptTask: Task) {
    this.selectedTask = acceptTask;
    this.taskSelectFlag = !this.taskSelectFlag;
    this.selectedMaster = null;
  }

  selectedMaster: Master;

  masterSelect(acceptMaster: Master) {
    this.selectedMaster = acceptMaster;
  }


  removeTask(task: Task) {
    var headers = new HttpHeaders().set('Authorization', 'Bearer ' +
      localStorage.getItem('jwt'));
    var options = {headers: headers, withCredentials: true};

    return this.http.post(this.localhost.deleteTask, task, options);
  }

  addTask(task: Task) {
    var headers = new HttpHeaders().set('Authorization', 'Bearer ' +
      localStorage.getItem('jwt'));
    var options = {headers: headers, withCredentials: true};
    return this.http.post(this.localhost.addNewTask, task, options);
  }

  task: Task;
  ready: boolean;

  appointMaster() {
    this.removeTask(this.selectedTask).subscribe(
      (data: Task) => {
        this.task = data;
      },
      error => console.log(error)
    );
    this.selectedTask.masterId = this.selectedMaster.masterId;
    this.addTask(this.selectedTask).subscribe(
      (data: Task) => {
        this.task = data;
      },
      error => console.log(error)
    );
    this.ready = true;
    this.selectedTask = null;
    this.selectedMaster = null;
    this.taskListFlag = false;
  }


  otherTask(){
    this.taskListFlag = false;
    this.selectedTask = null;
    this.taskListFlag = false;
  }

  newMasterFlag: boolean;

  newMaster() {
    this.newMasterFlag = true;
    this.taskListFlag = false;
  }

  masterAddedFlag:boolean;
  masterAdded(flag: boolean) {
    this.masterAddedFlag = flag;
  }
}
