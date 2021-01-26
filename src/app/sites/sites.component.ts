import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Site } from '../models/site.model';
import { SitesService } from '../services/sites.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit, OnDestroy {

  sites: Site[] = [];
  private siteSubscription: Subscription;

  constructor(public siteService: SitesService) {

  }

  ngOnInit(): void {
    this.siteService.getSites();

    this.siteSubscription = this.siteService.getSiteListener()
      .subscribe((sites: Site[])=>{
          this.sites = sites;
      });
  }

  ngOnDestroy(): void {
    this.siteSubscription.unsubscribe;
  }

  getStatusClass(site){
    return site.status === 1 ? "green":"red";
  }

}
