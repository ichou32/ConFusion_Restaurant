import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import {LEADERS} from '../shared/leaders'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]>{
    return Promise.resolve(LEADERS)
  }

  getFeaturedLeader():Promise<Leader>{
    return Promise.resolve(LEADERS.filter(LEADERS => LEADERS.featured == true)[0])
  }
}
