import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedBack, contacttype } from '../shared/feedBack';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedBackForm: FormGroup
  feedBack: FeedBack
  contacttype= contacttype
  @ViewChild('fform') feedbackFormDirective;
  formErrors={
    'firstname': '',
    'lastname': '',
    'telnum': 0,
    'email':''
  }
  ValidationMessages = {
    'firstname': {
      'required': 'first name is required',
      'minlength': 'first name must be at least 3 characters long',
      'maxlength': 'first name can not be more that 30 characters long'
    },
    'lastname': {
      'required': 'last name is required',
      'minlength': 'last name must be at least 3 characters long',
      'maxlength': 'last name can not be more that 30 characters long'
    },
    'email': {
      'required': 'Email is required',
      'email' : 'email not in valid format'
    },
    'telnum':{
      'required': 'tel. number is required',
      'pattern': 'Tel. number can not have characters'
    }

  }

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm(){
    this.feedBackForm = this.fb.group({
      firstname:['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastname:['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      telnum:[0,[Validators.required, Validators.pattern]],
      email:['44',[Validators.required, Validators.email]],
      agree:false,
      contacttype:'None',
      message:''
    })
    this.feedBackForm.valueChanges
        .subscribe(data => this.onValueChanged(data))
    this.onValueChanged(); // (re)set validation message now`
  }

  onValueChanged(data?: any){
    if (!this.feedBackForm) return
    const form = this.feedBackForm

    for (const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        // clear previous error message  (if any)
        this.formErrors[field] = ''
        const control = form.get(field)
        if( control && control.dirty && !control.valid) {
          const messages = this.ValidationMessages[field]
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
    this.feedBack = this.feedBackForm.value;
    console.log('the form information',this.feedBack)
    this.feedBackForm.reset({
      firstname:'',
      lastname: '',
      telnum:0,
      email: '',
      agree:false,
      contacttype:'None',
      message:''
    })
    this.feedbackFormDirective.resetForm()
  }
}
