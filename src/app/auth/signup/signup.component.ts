import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from 'src/app/models/account.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService:AuthService) { }

  loading = false;

  ngOnInit(): void {
  }

  loginUser(form: NgForm){
    console.log("logging in user", form)
    if(form.invalid){
      return;
    }

    const account:Account = {
      name: form.value.account,
      fullname: form.value.fullname,
      email: form.value.email,
      password: form.value.password,
    };
    this.loading = true;
    this.authService.createAccount(account);

  }

}
