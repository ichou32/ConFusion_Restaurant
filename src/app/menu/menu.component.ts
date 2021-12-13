import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish'
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes : Dish[]
  errMss : string

  constructor( private dishServices : DishService,
               @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishServices.getDishes()
      .subscribe((dishes) => this.dishes = dishes,
        errmss => this.errMss = <any>errmss)
  }


}
