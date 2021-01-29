import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { Site } from 'src/app/models/site.model';
import { StatusCode } from 'src/app/models/statusCode.model';
import { Test } from 'src/app/models/test.model';
import { Log } from 'src/app/models/log.model';
import { SitesService } from 'src/app/services/sites.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  site:Site;
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

  constructor(public siteService: SitesService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {

        this.id = paramMap.get("id");
        console.log("site", this.id)
        this.isLoading = true;
        this.siteService.getSite(this.id).subscribe(siteData => {
          console.log("getting site", this.id)
          this.isLoading = false;
          this.site = siteData
          this.statusCodes = this.siteService.getStatusCodes();
          this.newTest = JSON.parse(JSON.stringify(this.defaultTest));
          this.newTest.app_id = this.site.id;
        });
      }
    });
  }

  formatCode(code) { //test
    const searched = this.statusCodes.find(value => value.code == code);
    if(searched){
      return searched.code+" - "+searched.text;

    }else{
      return "---"
    }
  }

  cancel() {
    this.router.navigate(["/"]);
  }

  onAddSite(form: NgForm){
    if(form.invalid){
      return;
    }
      console.log("post added", form.value)
      this.site.name = form.value.name;
      this.site.status = form.value.status;
      this.siteService.addSite(this.site);
      this.router.navigate(["/"]);


  }

}
