import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish'
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { DishService } from '../services/dish.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes : Dish[];

  selectedDish: Dish

  constructor( private dishServices : DishService) { }

  ngOnInit() {
    this.dishes = this.dishServices.getDishes()
  }

  onSelect(dish: Dish){
    this.selectedDish = dish
  }

}
