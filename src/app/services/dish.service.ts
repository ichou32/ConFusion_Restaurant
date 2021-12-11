import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { resolve } from 'url';

import {Dish} from '../shared/dish'
import {DISHES} from '../shared/dishes'


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

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

  getDishes(): Observable<Dish[]>{
    return of(DISHES).pipe(delay(2000))
  }

  getDish(id: string): Observable<Dish> {
    return   of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000))
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000))
  }

  getDishIds(): Observable<string[]| any>{
    return of(DISHES.map(dish => dish.id))
  }
}
