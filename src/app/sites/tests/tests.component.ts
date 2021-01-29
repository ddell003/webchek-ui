import { Component, Input, OnInit } from '@angular/core';
import { Site } from 'src/app/models/site.model';
import { StatusCode } from 'src/app/models/statusCode.model';
import { Test } from 'src/app/models/test.model';
import { SitesService } from 'src/app/services/sites.service';
import * as moment from 'moment';
import { Log } from 'src/app/models/log.model';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  statusCodes:StatusCode[];
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
  constructor(private siteService: SitesService) {}


  @Input() site:Site;
  @Input() dashboard:boolean = false;

  ngOnInit(): void {
    console.log("test component", this.site)
    this.statusCodes = this.siteService.getStatusCodes();
    this.newTest = JSON.parse(JSON.stringify(this.defaultTest));
    this.newTest.app_id = this.site.id;
  }

  addTest(){
    this.createTest = ! this.createTest;
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
    console.log("submit form", this.newTest)
    this.createTest = false;
    this.siteService.createTest(this.newTest)
      .subscribe((body)=> {
        console.log("test created", body)
        this.site.tests.push(body);
        this.newTest = JSON.parse(JSON.stringify(this.defaultTest));
      });
  }

  run(test:Test) {
    this.siteService.runTest(test)
    .subscribe((body: Log)=> {
      console.log("test ran", body)
      const index = this.site.tests.findIndex(value =>value.id == test.id)
      this.site.tests[index].latest = body;
    });
  }


}
