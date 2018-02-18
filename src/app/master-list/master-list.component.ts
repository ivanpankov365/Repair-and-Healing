import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Task} from '../task';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Master} from '../master';
import {Localhost} from '../localhost';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.css']
})
export class MasterListComponent implements OnInit {

  master: Master;
  masters: Master[] = [];
  localhost: Localhost = new Localhost();
  selectedMasters: Master[] = [];

  constructor(private http: HttpClient) {
  }

  getTaskList() {
    var headers = new HttpHeaders().set('Authorization', 'Bearer ' +
      localStorage.getItem('jwt'));
    var options = {headers: headers, withCredentials: true};
    return this.http.get(this.localhost.masterList, options);
  }


  count: number = 0;

  ngOnInit() {
    this.getTaskList().subscribe((data: Master[]) => {
        for (let master of data) {
          if (master.departmentId == this.selectedTask.caseId || master.departmentId == null) {
            this.selectedMasters[this.count] = master;
            this.count = this.count + 1;
          }
        }
      }
    );


  }

  @Input() selectedMasterList: Master;
  @Input() selectedTask: Task;
  @Output() masterSelect = new EventEmitter<Master>();

  selectFlag: boolean;
  selectMaster(master) {
    this.selectFlag = true;
    this.masterSelect.emit(master);
    this.selectedMasterList = master;
  }


}
