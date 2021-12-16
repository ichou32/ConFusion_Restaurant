import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

import { Leader } from '../shared/leader';
import {LEADERS} from '../shared/leaders'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService : ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getFeaturedLeader():Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership?featured = true').pipe(map(leader => leader[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }
}
