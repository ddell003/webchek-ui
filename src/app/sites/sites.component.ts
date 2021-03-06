import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Site } from '../models/site.model';
import { SitesService } from '../services/sites.service';
import {Subscription} from 'rxjs';
import { Test } from '../models/test.model';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit, OnDestroy {

  sites: Site[] = [];
  isLoading = true;
  toggledSites = [];
  private siteSubscription: Subscription;
  private newSiteSub: Subscription;
  private userSubscription: Subscription;
  usersLoaded = false;

  constructor(public siteService: SitesService, private router: Router, private userService: UsersService) {

  }

  ngOnInit(): void {
    this.siteService.getSites();

    this.siteSubscription = this.siteService.getSiteListener()
      .subscribe((sites: Site[])=>{
          this.sites = sites;
          this.isLoading = false;
      });

    this.newSiteSub = this.siteService.getNewSiteListener()
    .subscribe((site: Site)=>{
        console.log("new site created", site)
        this.router.navigate(['/sites/edit/'+site.id]);
    });
    this.userService.getUsers();
    this.userSubscription = this.userService.getUserListener()
        .subscribe((users: User[])=>{
          this.usersLoaded = true;
        });
  }

  ngOnDestroy(): void {
    this.siteSubscription.unsubscribe;
    this.newSiteSub.unsubscribe;
    this.userSubscription.unsubscribe();
  }

  toggleSite(site: Site){

    if(this.toggledSites.includes(site.id)){
      const index = this.toggledSites.indexOf(site.id);
      if (index > -1) {
        this.toggledSites.splice(index, 1);
      }
    }
    else{
      this.toggledSites.push(site.id);
    }
  }

  getStatusClass(site){
    let pass = true;

    const failed = ""
    return site.status == 1 ? "green":"red";
  }

  showNoTests(site) {
    if(! site){
      return;
    }

    return site && site.tests.length == 0 && site.status == 1
  }

  hasStatus(status, tests: Test[]) {

    if(! tests){
      return
    }
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

  runSiteTests(site: Site){
    console.log("testinggg...")
    this.siteService.runSiteTests(site)
    .subscribe((body)=> {
      console.log("site tests ran")
      const index = this.sites.findIndex(value =>value.id == site.id)
      this.sites[index] = body;
    });
  }

  deleteSite(site: Site) {
    if(confirm("Are you sure you want to delete the site: "+site.name)) {
      const index = this.sites.findIndex(value =>value.id == site.id)
      this.sites.splice(index, 1);
      this.siteService.deleteSite(site)
      .subscribe((body)=> {
        console.log("site deleted")
      });
    }
  }


}
