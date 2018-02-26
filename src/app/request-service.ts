import {Injectable, OnInit} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class RequestService {

  options: object;

  constructor() {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' +
      localStorage.getItem('jwt'));
    this.options = {headers: headers, withCredentials: true};
  }

  getOptions() {
    return this.options;
  }


}
