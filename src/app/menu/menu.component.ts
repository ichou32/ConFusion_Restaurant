import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish'
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseurl';
import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host:{
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations:[
    flyInOut()
  ]
})
export class MenuComponent implements OnInit {

  dishes : Dish[]
  errMss : string

  constructor( private dishServices : DishService,
               @Inject('baseURL') public BaseURL) { }

  ngOnInit() {
    this.dishServices.getDishes()
      .subscribe((dishes) => this.dishes = dishes,
        errmss => this.errMss = <any>errmss)
  }


}
