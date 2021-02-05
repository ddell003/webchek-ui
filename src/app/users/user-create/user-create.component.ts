import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  newUser: User = {api_token: '', created_at: '', owner: 0, updated_at: '', id: null, name: '', email: ''};

  constructor(public userService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigate(['/']);
  }

  onAddUser(form: NgForm){
    if (form.invalid){
      return;
    }
    console.log('user added', form.value);
    this.newUser.name = form.value.name;
    this.newUser.email = form.value.email;
    this.userService.addUser(this.newUser);
    this.newUser = {api_token: '', created_at: '', owner: 0, updated_at: '', name: '', email: '', id: null};
    form.resetForm();
    this.router.navigate(['/']);
  }
}
