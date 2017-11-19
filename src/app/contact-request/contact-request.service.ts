import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { api } from '../../environments/environment';
import { ContactRequest } from './contact-request';

@Injectable()
export class ContactRequestService {

  constructor(private http: HttpClient) {}

  store(data: any): Observable<ContactRequest> {
    const url = `${api.url}/contact-requests`;
    return this.http.post(url, data)
      .timeout(10000)
      .map(res => res as ContactRequest);
  }
}
