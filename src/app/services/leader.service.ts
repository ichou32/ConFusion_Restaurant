import { Injectable } from '@angular/core';
import { DISHES } from '../shared/dishes';
import { Leader } from '../shared/leader';
import {LEADERS} from '../shared/leaders'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]>{
    return new Promise(resolve =>
      setTimeout( () => resolve(LEADERS), 2000))
  }

  getFeaturedLeader():Promise<Leader>{
    return new Promise(resolve => 
      setTimeout(() => resolve(LEADERS.filter(LEADERS => LEADERS.featured == true)[0]), 2000)
    )
  }
}
