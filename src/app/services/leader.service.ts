import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import {LEADERS} from '../shared/leaders'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Leader[]{
    return LEADERS
  }

  getFeaturedLeader():Leader{
    return LEADERS.filter(LEADERS => LEADERS.featured == true)[0]
  }
}
