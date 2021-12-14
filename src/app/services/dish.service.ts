import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Dish} from '../shared/dish'
import { Http } from '@angular/http';
import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor( private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  // this will resolve Dishes immediatelly
  // getDishes():Promise<Dish[]> {
  //   return  Promise.resolve(DISHES);                     way 1 simple 
  // }

  /*getDishes(): Promise<Dish[]>{
    return new Promise( resolve =>
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES),2000);                way 2 resolve Promise
    )
  }*/

  /*getDishes(): Promise<Dish[]> {
    return of(DISHES).pipe(delay(2000)).toPromise();         way 3 using rxjs
  }*/

  /*getDishes(): Observable<Dish[]>{
    return of(DISHES).pipe(delay(2000))
  } */
  getDishes(): Observable<Dish[]>{
    return this.http.get<Dish[]>(baseURL+'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getDish(id: string): Observable<Dish> {
    return   this.http.get<Dish>(baseURL+ 'dishes/'+ id)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getDishIds(): Observable<string[]| any>{
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error))
  }

  putDish(dish: Dish): Observable<Dish>{
    const httpOptions= {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.put<Dish>(baseURL + 'dishes/'+dish.id, dish, httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError))
  }
}
