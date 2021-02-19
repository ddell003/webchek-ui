import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Owner} from "../models/owner.model";
// import { Test } from '../models/test.model';
// import { Log } from '../models/log.model';


const URL = environment.apiUrl;
const USER_URL = `${URL}users`;
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: User[] = [];
  private owners: Owner[] = [
    {viewValue: 'Yes'},
    {viewValue: 'No'}
  ];
  private userUpdated = new Subject<User[]>();
  constructor(private http: HttpClient) { }

  getOwners() {
    return [...this.owners];
  }

  getUsers() {
    this.http.get<User[]>(USER_URL)
      .subscribe((body) => {
        this.users = body;
        console.log("fetching users from api..");
        this.userUpdated.next([...this.users]);
      });
  }

  getLoadedUsers() {
    if(this.users.length > 0){
      return [...this.users]
    }
    else{
      console.log("couldnt find users....")
      this.getUsers();
      return null;
    }
  }

  getUser(id) {
    return this.http.get<User>(`${USER_URL}/${id}`);
  }

  addUser(user: User) {
    this.http.post<User>(USER_URL, user)
      .subscribe((body: User) => {
        this.users.push(body);
        this.userUpdated.next([...this.users]);
      });
  }

  deleteUser(user: User) {
    return this.http.delete<User>(`${URL}users/${user.id}`, {});
  }

  createUser(user: User) {
    console.log('in service');
    return this.http.post<User>(`${URL}users`, user);
  }

  updateUser(user: User) {
    return this.http.put<User>(`${URL}users/${user.id}`, user);
  }

  getUserListener() {
    return this.userUpdated.asObservable();
  }
}
