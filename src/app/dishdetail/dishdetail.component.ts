import { Component, OnInit, Inject} from "@angular/core";
import { Params,ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { comment } from "../shared/comments";
import { Dish} from "../shared/dish";
import { DishService } from "../services/dish.service";
import { switchMap } from "rxjs/operators" ;
import { animate, trigger, state, style, transition} from "@angular/animations";

@Component({
  selector: "app-dishdetail",
  templateUrl: "./dishdetail.component.html",
  styleUrls: ["./dishdetail.component.scss"],
  animations:[
    trigger ('visibility', [
      state('shown', style({
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition('*=>*',animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {

  ratingForm: FormGroup
  comment: comment
  dish: Dish;
  dishCopy: Dish
  errMss: string
  dishIds: string[]
  prev : string
  next : string
  visibility= 'shown'

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
              private fb: FormBuilder,
              @Inject('BaseURL') public BaseURL){}

  ngOnInit() {
    this.dishService.getDishIds().subscribe( dishIds => this.dishIds = dishIds,
      errmss => this.errMss = errmss)
    this.rout.params.pipe(switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishService.getDish(params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishCopy = dish; this.setPrevNext(dish.id); this.visibility= 'shown' },
      errmss => this.errMss = <any>errmss);

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
    this.dishCopy.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy)
      .subscribe(dish =>{
        this.dish = dish; this.dishCopy= dish
      },
      errmss =>{ this.dishCopy =null; this.dish = null; this.errMss = <any>errmss})
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
