import {Component, Input, OnInit} from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Owner } from 'src/app/models/owner.model';
import { UsersService } from 'src/app/services/users.service';
import {Test} from '../models/test.model';
import {Log} from '../models/log.model';
import { Subscription } from 'rxjs';
import * as moment from 'moment';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit {

  /**
   * Notes
   * make a user service
   * tie to the user service
   * make api call to get user
   *
   */


  users: User[] = [];
  owners: Owner[];
  id = null;
  isLoading = true;
  createUser = false;
  newUser: User;
  defaultUser: User = {
    app_id: null,
    api_token: null,
    created_at: '',
    email: '',
    id: null,
    name: '',
    owner: '',
    updated_at: null,
    password: ''
  };
  editingUser = null;
  private userSubscription: Subscription;

  constructor(private userService: UsersService) {
  }

  @Input() user: User;
  @Input() owner: Owner;

  ngOnInit(): void {
    this.owners = this.userService.getOwners();
    this.newUser = JSON.parse(JSON.stringify(this.defaultUser));
    this.userService.getUsers();
    this.userSubscription = this.userService.getUserListener()
      .subscribe((users: User[])=>{
          this.users = users;
          this.isLoading = false;
          console.log("users", users);
      });
  }

  // tslint:disable-next-line:typedef
  addUser() {
    this.createUser = !this.createUser;
  }

  getDate(date) {
    return moment(date).format('MMMM Do YYYY');
  }

  // tslint:disable-next-line:typedef
  formatOwner(viewValue) {
    const searched = this.owners.find(value => value.viewValue === viewValue);
    if (searched){
      return searched.viewValue;
    }else{
      return '---';
    }
  }

  // tslint:disable-next-line:typedef
  deleteUser(user: User) {
    if (confirm('Are you sure you want to delete the user: ' + user.name)) {
      const index = this.users.findIndex(value => value.id === user.id);
      this.users.splice(index, 1);
      this.userService.deleteUser(user)
        .subscribe((body) => {
          console.log('user deleted');
        });
    }
  }

  editUser(user: User){
    console.log("editing users", user);
    this.editingUser = user.id;

  }

  updateUser(user:User){
    console.log("updating user");
    this.userService.updateUser(user).subscribe((body) => {
      console.log('user updated', body);
      this.editingUser = null;

    });;
  }
  cancelEdit(){
    this.editingUser = null;
  }

  // edit(user: User){
  //
  // }

  // tslint:disable-next-line:typedef
  uploadUser() {
    console.log('submit form', this.newUser);
    this.createUser = false;
    this.userService.createUser(this.newUser)
      .subscribe((body) => {
        console.log('user created', body);
        this.users.push(body);
        this.newUser = JSON.parse(JSON.stringify(this.defaultUser));
      });
  }
}
