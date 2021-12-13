import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';

import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from '../services/promotion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dishErrMess : string
  dish: Dish;
  promotion: Promotion;
  FeaturedLeader: Leader

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
        .subscribe(dish => this.dish = dish,
          errmss => this.dishErrMess = errmss);
      //.then(dish => this.dish = dish); when using Promise

    this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion);

    this.leaderService.getFeaturedLeader()
      .subscribe(FeaturedLeader => this.FeaturedLeader = FeaturedLeader)
  }

}
