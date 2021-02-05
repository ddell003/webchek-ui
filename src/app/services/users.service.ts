import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import { Test } from '../models/test.model';
// import { Log } from '../models/log.model';


const URL = environment.apiUrl;
const USER_URL = `${URL}apps`;
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: User[] = [];
  private userUpdated = new Subject<User[]>();
  constructor(private http: HttpClient) { }

  getUsers() {
    this.http.get<User[]>(USER_URL)
      .subscribe((body) => {
        this.users = body;
        console.log(body);
        this.userUpdated.next([...this.users]);
      });
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
    return this.http.delete<User>(`${URL}apps/${user.id}`, {});
  }

  getUserListener() {
    return this.userUpdated.asObservable();
  }
}
