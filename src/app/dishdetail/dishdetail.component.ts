import { Component, OnInit } from "@angular/core";
import { Params,ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { comment } from "../shared/comments";
import { Dish} from "../shared/dish";
import { DishService } from "../services/dish.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-dishdetail",
  templateUrl: "./dishdetail.component.html",
  styleUrls: ["./dishdetail.component.scss"],
})
export class DishdetailComponent implements OnInit {

  ratingForm: FormGroup
  comment: comment
  dish: Dish;
  dishIds: string[]
  prev : string
  next : string

  formErrors={
    'comment':'',
    'rating':5,
    'author':'',
    'date':''

  }
  validationMessages={
    'author':{
      'required': 'the name is required',
      'minlength': 'the name must have at least 2 characters long'
    },
    'comment':{
      'required': 'the comment can\'t be null'      
    }
  }

  constructor(private dishService: DishService,
              private rout: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder){}

  ngOnInit() {
    this.dishService.getDishIds().subscribe( dishIds => this.dishIds = dishIds)
    this.rout.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });

    this.createForm();
  }

  setPrevNext(dishId : string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length]
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length]
  }

  goBack(): void{
    this.location.back();
  }

  createForm(){
    this.ratingForm = this.fb.group({
      'rating': 5,
      'comment': ['',[Validators.required, Validators.minLength(1)]],
      'author': ['',[Validators.required, Validators.minLength(2)]],
    })
    this.ratingForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any){
    if (!this.ratingForm) return
    const form = this.ratingForm

    for (const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        // clear previous error message  (if any)
        this.formErrors[field] = ''
        const control = form.get(field)
        if( control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field]
          for(const key in control.errors) {
            if (control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ''
            }
          }
        }
      }
    }
  } 

  onSubmit(){

    const d = new Date();

    this.comment = this.ratingForm.value;
    this.comment.date=d.toString(); // set the date to the comment
    this.dish.comments.push(this.comment);
    console.log(this.comment)
   this.ratingForm.reset({
     'author':'',
     'comment':'',
     'rating':5,
     'date':''
   })
   this.ratingForm.reset()

  }
}
