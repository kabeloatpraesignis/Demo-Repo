
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginFormModel } from './login-form-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({});
  loginModel = new LoginFormModel();

  public passwordFlag = false ;
  public errorMsg = false ;
  constructor(private frmBuilder:FormBuilder,
    private route:Router) { }

  ngOnInit(): void {
    this.loginForm = this.frmBuilder.group({
      email: ['',[Validators.email,Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  login(){

      this.ErrorHandler() ?  this.route.navigate(['/dashboard']): null ;

    }
 ErrorHandler():boolean {
    if (!this.loginForm.valid ) {
      //reset our form
      this.loginModel.errorFlag = false;
      this.errorMsg = false;
      this.passwordFlag = false ;
      this.loginModel.errorMessage = [];

      //assign field properties to validation status check variables
      let  emailValidation = this.loginForm.get('email');
      let  passwordValidation = this.loginForm.get('password');


      //check validation status and respond to errors
        if (!emailValidation?.valid ) {
          this.loginModel.errorFlag = true;
          this.errorMsg = true;
          this.loginModel.errorMessage.push('Invalid Email address entered');
          return false;
        }

        if (!passwordValidation?.valid) {
            this.passwordFlag = true;
            this.errorMsg = true;
            this.loginModel.errorMessage.push('Password is a required field');
            return false;
        }
    }

    return true;
 }
}
