import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { resolve } from 'url';
import { HttpClient } from '@angular/common/http';
import {Dish} from '../shared/dish'
import { Http } from '@angular/http';
import { baseURL } from '../shared/baseurl';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor( private http: HttpClient) { }

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
  }

  getDish(id: string): Observable<Dish> {
    return   this.http.get<Dish>(baseURL+ 'dishes/'+ id)
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
  }

  getDishIds(): Observable<string[]| any>{
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
  }
}
