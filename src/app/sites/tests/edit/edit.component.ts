import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { SitesService } from 'src/app/services/sites.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Site } from 'src/app/models/site.model';
import { StatusCode } from 'src/app/models/statusCode.model';
import { Test } from 'src/app/models/test.model';
import { Log } from 'src/app/models/log.model';
import * as moment from 'moment';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-editTest',
  templateUrl: './editTest.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditTestComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  constructor(
    public siteService: SitesService,
    private router: Router,
    private route:ActivatedRoute,
    private userService: UsersService
    ) { }

  test:Test;
  statusCodes:StatusCode[];
  id = null;
  siteId = null;
  isLoading = true;
  loadingUsers = true;
  createTest = false;
  amount = "15 Minutes";
  users: User[] = [];


  ngOnInit(): void {
    console.log("editting")
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        console.log("site_id", paramMap.has("id"))
        this.id = paramMap.get("id");
        this.siteId = paramMap.get("siteId");
        console.log("site", this.siteId)
        this.isLoading = true;
        this.siteService.getTest(this.id, this.siteId).subscribe(testData => {
          this.isLoading = false;
          this.test = testData
          this.statusCodes = this.siteService.getStatusCodes();

        });
        const loadedUsers = this.userService.getLoadedUsers();
        this.users = (loadedUsers) ? loadedUsers : [];
        if(this.users){
          this.loadingUsers = false;
        }
        this.userSubscription = this.userService.getUserListener()
        .subscribe((users: User[])=>{
            this.users = users;
            this.loadingUsers = false;
        });

      }
    });
  }

  compareFn(user1: User, user2: User) {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  saveTest(form: NgForm) {

    if(form.invalid){
      return;
    }
    if(this.test.frequency === "minutes"){
      this.test.frequency_amount = "15";
    }
    else{
      this.test.frequency_amount = "1";
    }
    console.log("saving test.....", this.test)
    this.siteService.updateTest(this.test).subscribe((body)=> {
      console.log("test updated", body)
      this.router.navigate([`/sites/edit/${this.test.app_id}`]);

    });;
  }

  cancel() {
    this.router.navigate([`/sites/edit/${this.test.app_id}`]);
  }

}
