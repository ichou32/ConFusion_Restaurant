import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';

import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from '../services/promotion.service';
import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations:[
    flyInOut()
  ]
})
export class HomeComponent implements OnInit {

  dishErrMess : string
  dish: Dish;
  promotion: Promotion;
  promotionErr: string
  FeaturedLeader: Leader
  leaderErr: string

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
        .subscribe(dish => this.dish = dish,
          errmss => this.dishErrMess = errmss);
      //.then(dish => this.dish = dish); when using Promise

    this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion,
       errMes => this.promotionErr = errMes);

    this.leaderService.getFeaturedLeader()
      .subscribe(FeaturedLeader => this.FeaturedLeader = FeaturedLeader,
        error => this.leaderErr = error)
  }

}
