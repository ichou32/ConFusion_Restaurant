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

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm(){
    this.feedBackForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      telnum:[0,Validators.required],
      email:['44',Validators.required],
      agree:false,
      contacttype:'None',
      message:''
    })
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
