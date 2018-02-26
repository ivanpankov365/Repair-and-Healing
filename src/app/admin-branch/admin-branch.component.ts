import {Component, OnInit} from '@angular/core';
import {Admin} from '../admin';
import {Task} from '../task';
import {Master} from '../master';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Localhost} from '../localhost';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {RequestService} from '../request-service';


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
  adminVerify: boolean; // ответ от сервера
  adminCheckFlag: boolean;
  selectTaskFlag: boolean;
  otherTaskFlag: boolean;
  refreshFlag: boolean;
  selectedTask: Task;
  taskSelectFlag: boolean;
  selectedMaster: Master;
  task: Task;
  ready: boolean;
  newMasterFlag: boolean;
  masterAddedFlag: boolean;

  constructor(private http: HttpClient) {
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


  adminCheck(admin: Admin) {
    this.adminCheckFlag = true;
    this.loginPost(admin);

  }


  taskListFlag: boolean = false;

  taskList() {
    this.taskListFlag = true;
    this.taskSelectFlag = false;
    this.newMasterFlag = false;
    this.ready = false;
    this.otherTaskFlag = true;
    this.refreshFlag = !this.refreshFlag;
  }


  taskSelect(acceptTask: Task) {
    this.selectedTask = acceptTask;
    console.log(this.selectedTask);
    this.selectedMaster = null;
  }


  masterSelect(acceptMaster: Master) {
    this.selectedMaster = acceptMaster;
  }


  removeTask(task: Task) {
    let options = new RequestService();
    return this.http.post(this.localhost.deleteTask, task, options.getOptions());
  }

  addTask(task: Task) {
    let options = new RequestService();
    return this.http.post(this.localhost.addNewTask, task, options.getOptions());
  }


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
        this.selectedTask = null;
        this.selectedMaster = null;
        this.otherTaskFlag = true;
        this.refreshFlag = !this.refreshFlag;
      },
      error => console.log(error)
    );

  }


  otherTask() {
    this.selectTaskFlag = false;
    this.selectedTask = null;
    this.otherTaskFlag = true;
    this.refreshFlag = !this.refreshFlag;
  }


  newMaster() {
    this.newMasterFlag = true;
    this.taskListFlag = false;
    this.taskSelectFlag = false;
  }


  masterAdded(flag: boolean) {
    this.masterAddedFlag = flag;
  }
}
