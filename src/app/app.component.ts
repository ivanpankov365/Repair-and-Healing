import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  addTaskFlag: boolean = false;
  adminEnterFlag: boolean = false;
  masterEnterFlag: boolean = false;
  addTaskChangeFlag: boolean = false;
  adminEnterChangeFlag: boolean = false;
  masterEnterChangeFlag: boolean = false;


  addTask() {
    this.addTaskFlag = true;
    this.adminEnterFlag = false;
    this.masterEnterFlag = false;
    this.addTaskChangeFlag = !this.addTaskChangeFlag;
  }

  adminEnter() {
    this.addTaskFlag = false;
    this.adminEnterFlag = true;
    this.masterEnterFlag = false;
    this.adminEnterChangeFlag = !this.adminEnterChangeFlag;
  }

  masterEnter() {
    this.addTaskFlag = false;
    this.adminEnterFlag = false;
    this.masterEnterFlag = true;
    this.masterEnterChangeFlag = !this.masterEnterChangeFlag;
  }

tes: boolean
  test(){
    this.tes = true;
  }

}
