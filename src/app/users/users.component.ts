import {Component, Input, OnInit} from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Owner } from 'src/app/models/owner.model';
import { UsersService } from 'src/app/services/users.service';
import {Test} from '../models/test.model';
import {Log} from '../models/log.model';



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

  constructor(private userService: UsersService) {
  }

  @Input() user: User;
  @Input() owner: Owner;

  ngOnInit(): void {
    this.owners = this.userService.getOwners();
    this.newUser = JSON.parse(JSON.stringify(this.defaultUser));
  }

  // tslint:disable-next-line:typedef
  addUser() {
    this.createUser = !this.createUser;
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
      console.log('Implement delete functionality here');
      const index = this.users.findIndex(value => value.id === user.id);
      this.users.splice(index, 1);
      this.userService.deleteUser(user)
        .subscribe((body) => {
          console.log('user deleted');
        });
    }
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
