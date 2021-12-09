import { Component, OnInit } from '@angular/core';

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

  dish: Dish;
  promotion: Promotion;
  FeaturedLeader: Leader

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
      .then(dish => this.dish = dish);

    this.promotionservice.getFeaturedPromotion()
    .then(promotion => this.promotion = promotion);

    this.leaderService.getFeaturedLeader()
      .then(FeaturedLeader => this.FeaturedLeader = FeaturedLeader)
  }

}
