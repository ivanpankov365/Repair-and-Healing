import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Master} from '../master';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Task} from '../task';
import {Localhost} from '../localhost';
import {RequestService} from '../request-service';

@Component({
  selector: 'app-new-master',
  templateUrl: './new-master.component.html',
  styleUrls: ['./new-master.component.css']
})
export class NewMasterComponent {

  master: Master = new Master();
  localhost: Localhost = new Localhost();
  newMasterFlag: boolean;
  newMasterAddFlag: boolean;
  receivedMaster: Master;
  @Output() masterAdded = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
  }



  postMaster(master: Master) {
    let options = new RequestService();
    return this.http.post(this.localhost.addNewMaster, master, options.getOptions());
  }


  onSubmit(master: Master) {
    this.newMasterFlag = false;
    this.newMasterAddFlag = true;
    this.masterAdded.emit(true);
    this.postMaster(master).subscribe(
      (data: Master) => {
        this.receivedMaster = data;
      },
      error => console.log(error)
    );
  }


}
