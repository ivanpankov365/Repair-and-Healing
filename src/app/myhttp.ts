import {Component, Injectable} from '@angular/core';

/*import {Http,Headers} from '@angular/http';*/
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Component ({selector: 'app-test-auth'})
export class MyHttpClient {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }
  createAuthorizationHeader(headers:HttpHeaders) {
    headers.append('Authorization', 'Bearer ' +
      localStorage.getItem('Token'));
  }
  get(url) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }
  post(url, data) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }
  /*post(url, obj) {
    let headers = new Headers();
    let data = JSON.stringify(obj);
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }*/
}
