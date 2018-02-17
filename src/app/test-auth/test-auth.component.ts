import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {Admin} from '../admin';
import {Localhost} from '../localhost';
import {Task} from '../task';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-test-auth',
  templateUrl: './test-auth.component.html',
  styleUrls: ['./test-auth.component.css']
})
export class TestAuthComponent {


  url: string = 'http://localhost:9090/api/auth';



  constructor(private http: HttpClient) {}


  data = '{"email":"admin","password":"1"}';

  tok:string;
  flag:boolean= false;
  error: any;
  handleSomethingPost() {
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    var options = {headers: headers};
    this.http.post(this.url, this.data, options).subscribe((data) =>{

        localStorage.setItem('jwt', data['token']);
      console.log(data['token']);
    }

    );

  }



  tasks: Task[] = [];
    localhost: Localhost = new Localhost();
    handleSomethingGET(){
      var headers = new HttpHeaders().append('authorization', 'Bearer ' +
      localStorage.getItem('jwt'));

      var options =  {headers: headers, withCredentials: true};
      console.log(options);

      this.flag = true;

      return this.http.get(this.localhost.taskList,  options).subscribe((data: Task[])=>{
        console.log(data);
        this.tasks = data;
      });
    }


}
