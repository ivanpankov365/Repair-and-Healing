import {Component, OnInit} from '@angular/core';
import {Master} from '../master';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Task} from '../task';
import {Localhost} from '../localhost';

@Component({
  selector: 'app-new-master',
  templateUrl: './new-master.component.html',
  styleUrls: ['./new-master.component.css']
})
export class NewMasterComponent {

  master: Master = new Master();
  localhost: Localhost = new Localhost();

  constructor(private http: HttpClient) {
  }

  newMasterFlag: boolean;
  newMasterAddFlag: boolean;

  newMaster() {
    this.newMasterFlag = true;
    this.newMasterAddFlag = false;
  }

  postMaster(master: Master) {
    var headers = new HttpHeaders().set('Authorization', 'Bearer ' +
      localStorage.getItem('jwt'));
    var options = {headers: headers, withCredentials: true};
    return this.http.post(this.localhost.addNewMaster, master, options);
  }

  receivedMaster: Master;

  onSubmit(master: Master) {
    this.newMasterFlag = false;
    this.newMasterAddFlag = true;
    this.postMaster(master).subscribe(
      (data: Master) => {
        this.receivedMaster = data;
      },
      error => console.log(error)
    );
  }

}
