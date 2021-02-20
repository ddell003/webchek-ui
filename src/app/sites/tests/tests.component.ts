import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Site } from 'src/app/models/site.model';
import { StatusCode } from 'src/app/models/statusCode.model';
import { Test } from 'src/app/models/test.model';
import { SitesService } from 'src/app/services/sites.service';
import * as moment from 'moment';
import { Log } from 'src/app/models/log.model';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit, OnDestroy {

  statusCodes: StatusCode[];
  private userSubscription: Subscription;
  id = null;
  isLoading = true;
  createTest = false;
  newTest: Test;
  defaultTest: Test = {
    id:null,
    url:"",
    app_id:null,
    name:"",
    curl:null,
    frequency:"",
    frequency_amount:"",
    expected_status_code:"200",
    created_at:null,
  }
  loadingUsers = true;
  users: User[] = [];
  constructor(private siteService: SitesService, private userService:UsersService) {}


  @Input() site:Site;
  @Input() dashboard:boolean = false;

  ngOnInit(): void {
    this.statusCodes = this.siteService.getStatusCodes();
    this.newTest = JSON.parse(JSON.stringify(this.defaultTest));
    if(this.site){
      this.newTest.app_id = this.site.id;
    }

    const loadedUsers = this.userService.getLoadedUsers();
    this.users = (loadedUsers) ? loadedUsers : [];
        this.userSubscription = this.userService.getUserListener()
        .subscribe((users: User[])=>{
            this.users = users;
            this.loadingUsers = false;
        });
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  addTest(){
    this.createTest = ! this.createTest;
  }

  compareFn(user1: User, user2: User) {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }

  getTestUsers(test){

    if(test.users.length == 0){
      return "No users have been set";
    }

    return "Users to Alert: "+test.users.map(function(elem){
      return elem.name;
  }).join(", ");


  }

  formatCode(code) {
    const searched = this.statusCodes.find(value => value.code == code);
    if(searched){
      return searched.code+" - "+searched.text;

    }else{
      return "---"
    }
  }

  getLastRanTime(log) {
    if(! log){
      return "";
    }
    return moment(log.updated_at).fromNow();
  }

  testStatusClass(log)
  {
    let color = "black material-icons mat-icon-no-color";
    if(! log){
        return color;
    }
    if(log.status === "passed"){
      color = "green material-icons mat-icon-no-color";
    }
    else if(log.status === "running"){
      color = "blink material-icons mat-icon-no-color";
    }
    else{
      color = "red material-icons mat-icon-no-color";
    }
    return color;
  }

  getStatusMssg(log) {
    if(! log){
      return "Has not been ran";
    }
    else if(log.status === "running"){
        return "The Test is Running"
    }
    else{
      const status = (log.status === 'passed') ? "It Pased" : "It Failed";
      return (log.message) ? status+" - "+log.message : status;
    }
  }

  deleteTest(test) {
    if(confirm("Are you sure you want to delete the test: "+test.name)) {
      console.log("Implement delete functionality here");
      const index = this.site.tests.findIndex(value =>value.id == test.id)
      this.site.tests.splice(index, 1);
      this.siteService.deleteTest(test)
      .subscribe((body)=> {
        console.log("test deleted")
      });
    }
  }

  uploadTest(){
    if(this.newTest.name == '' || this.newTest.frequency == '' || this.newTest.url == ''){
      return;
    }
    console.log("submit form", this.newTest)
    this.createTest = false;
    if(this.newTest.frequency === "minutes"){
      this.newTest.frequency_amount = "15";
    }
    else{
      this.newTest.frequency_amount = "1";
    }
    this.siteService.createTest(this.newTest)
      .subscribe((body)=> {
        console.log("test created", body)
        this.site.tests.push(body);
        this.newTest = JSON.parse(JSON.stringify(this.defaultTest));
        this.newTest.app_id = this.site.id;
      });
  }

  run(test:Test) {
    if(! test){
      return
    }
    this.siteService.runTest(test)
    .subscribe((body: Log)=> {
      console.log("test ran", body)
      const index = this.site.tests.findIndex(value =>value.id == test.id)
      if(this.site && this.site.tests.length > 0){
        this.site.tests[index].latest = body;
      }

    });
  }


}
