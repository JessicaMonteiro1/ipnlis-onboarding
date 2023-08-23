import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;


  constructor(private fb: FormBuilder, private auth: AuthService, private userStore: UserStoreService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  onLogin(){
    if(this.loginForm.valid){

      console.log(this.loginForm.value)

      //Send the obj to database
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res) => {
          //alert(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          const tokenPayLoad = this.auth.decodedToken();
          this.userStore.setNameForStore(tokenPayLoad.name);
          this.userStore.setRoleForStore(tokenPayLoad.role)
          this.router.navigate(['dashboard'])
        },
        error:(err) => {
          alert(err?.error.message)
        }
      })
    }else{

      //throw the error using toaster and with required fields
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Form inválida")
    }
  }


}
