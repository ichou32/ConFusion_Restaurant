import { Component, Inject, OnInit } from '@angular/core';
import {Leader} from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host:{
    '[@flyIiOut]': 'true',
    'style': 'display: block'
  }
})
export class AboutComponent implements OnInit {
 
   LEADERS: Leader[]
   errorMsg: string

  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit() {
    this.leaderService.getLeaders()
      .subscribe(LEAD => this.LEADERS =LEAD, error => this.errorMsg =error);
  }

}
