import { Injectable } from '@angular/core';
import { resolve } from 'url';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { HttpClient } from '@angular/common/http';
import { baseURL} from '../shared/baseurl';
import { ProcessHTTPMsgService} from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
      private processHttpMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions').pipe(
      catchError(this.processHttpMsgService.handleError)
    )
     
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/'+id).pipe(
      catchError(this.processHttpMsgService.handleError)
    )
    
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true')
        .pipe(map(promotion => promotion[0]))
        .pipe(catchError(this.processHttpMsgService.handleError))
     
  }
}
