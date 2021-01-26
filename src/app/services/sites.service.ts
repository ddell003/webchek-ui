import { Injectable } from '@angular/core';
import { Site } from '../models/site.model';
import {Subject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  private sites: Site[] = [];
  private siteUpdated = new Subject<Site[]>();

  constructor(private http: HttpClient) { }

  getSites() {


    /*this.http.post<{email:string}>(' http://127.0.0.1:8001/api/login', {"email":"bobsmith.@gmail.com", "password":"password"})
      .subscribe((body)=> {
        console.log(body);
      });*/
      const token = "fLaKDMu94uVy9KplRmUhedZhXUBHi6ieMeWoW4vrpB9jcM376gYntBkYX8xr0zXPvASszLKP3yfBWpvh";

      const header = {
        headers: new HttpHeaders()
          .set('Authorization',  `Bearer ${token}`)
      }

    this.http.get<Site[]>(' http://127.0.0.1:8001/api/apps')
      .subscribe((body)=> {
        this.sites = body;
        console.log(body);
        this.siteUpdated.next([...this.sites]);

      });


    //return [...this.sites];
  }

  addSite(site:Site) {
    this.sites.push(site);
    this.siteUpdated.next([...this.sites]);
  }

  getSiteListener() {
    return this.siteUpdated.asObservable();
  }
}
