import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { SitesService } from 'src/app/services/sites.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Site } from 'src/app/models/site.model';
import { StatusCode } from 'src/app/models/statusCode.model';
import { Test } from 'src/app/models/test.model';
import { Log } from 'src/app/models/log.model';
import * as moment from 'moment';


@Component({
  selector: 'app-editTest',
  templateUrl: './editTest.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditTestComponent implements OnInit {

  constructor(public siteService: SitesService, private router: Router, private route:ActivatedRoute) { }

  test:Test;
  statusCodes:StatusCode[];
  id = null;
  siteId = null;
  isLoading = true;
  createTest = false;
  amount = "15 Minutes";


  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {

        this.id = paramMap.get("id");
        this.siteId = paramMap.get("siteId");
        console.log("site", this.siteId)
        this.isLoading = true;
        this.siteService.getTest(this.id, this.siteId).subscribe(testData => {
          console.log("getting test", this.id)
          this.isLoading = false;
          this.test = testData
          this.statusCodes = this.siteService.getStatusCodes();
          console.log("found test", this.test)

        });
      }
    });
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
