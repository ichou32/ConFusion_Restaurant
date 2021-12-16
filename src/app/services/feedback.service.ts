import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FeedBack} from '../shared/feedBack';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  submitFeedback<FeedBack>(feedback: FeedBack){
    const httpOptions= {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<FeedBack>(baseURL+ 'feedback',feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }
}
