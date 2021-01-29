import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Site } from '../models/site.model';
import { SitesService } from '../services/sites.service';
import {Subscription} from 'rxjs';
import { Test } from '../models/test.model';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit, OnDestroy {

  sites: Site[] = [];
  isLoading = true;
  private siteSubscription: Subscription;

  constructor(public siteService: SitesService) {

  }

  ngOnInit(): void {
    this.siteService.getSites();

    this.siteSubscription = this.siteService.getSiteListener()
      .subscribe((sites: Site[])=>{
          this.sites = sites;
          this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.siteSubscription.unsubscribe;
  }

  getStatusClass(site){
    let pass = true;

    const failed = ""
    return site.status == 1 ? "green":"red";
  }

  hasStatus(status, tests: Test[]) {
    /*
    hasFailures:boolean = false;
  hasSuccesses:boolean = false;
  hasRunning:boolean = false;
  hasNew:boolean = false;*/
  if(tests.length === 0 ){
    return false;
  }
  let found = false;
  for(let i = 0; i < tests.length; i += 1){
    if(! tests[i].latest && status == "new"){
      found = true;
      break;
    }
    if(! tests[i].latest ){
      continue;
    }

    if(tests[i].latest.status == status){
      found = true;
      break;
    }
  }

    return found;
  }


}
