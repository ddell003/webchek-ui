import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private authStatusSub: Subscription;
  isloading = false;
  submitting = false;
  error = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(
      authStatus => {
        this.isloading = false;
        this.submitting = false;
        this.error = true;
      }
    );
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  loginUser(form: NgForm){
    console.log("logging in user", form)
    if(form.invalid){
      return;
    }
    this.submitting = true;
    this.isloading = true;
    const loggedin = this.authService.login(form.value.email, form.value.password)
  }

}
