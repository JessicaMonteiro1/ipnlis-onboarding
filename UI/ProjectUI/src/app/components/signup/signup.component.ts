import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;
  role: string = '';
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      userNome: ['', Validators.required],
      role: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  onSignup(){
    if(this.signUpForm.valid){
      //perform logic for signup
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res => {
          alert(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login']);
        }),
        error:(err => {
          alert(err?.error.message)
        })
      })

      console.log(this.signUpForm.value)
    }else{

      ValidateForm.validateAllFormFields(this.signUpForm)
      //logic for throwing error
    }
  }
  }