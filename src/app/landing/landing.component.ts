import { Component, OnInit } from '@angular/core';
import { Site } from '../models/site.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  storedPosts: Site[] = [];

  newSiteAdded(site){
    this.storedPosts.push(site);
  }

  ngOnInit(): void {
  }

}
