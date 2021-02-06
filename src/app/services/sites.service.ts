import { Injectable } from '@angular/core';
import { Site } from '../models/site.model';
import {Subject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { StatusCode } from '../models/statusCode.model';
import { Test } from '../models/test.model';
import { Log } from '../models/log.model';


const URL = environment.apiUrl;
const SITE_URL = `${URL}apps`;
@Injectable({
  providedIn: 'root'
})
export class SitesService {

  private sites: Site[] = [];
  private statusCodes: StatusCode[] = [
    {code:"200", text:"Good"},
    {code:"201", text:"Item Created"},
    {code:"204", text:"No Content"},
    {code:"206", text:"Partial Content"},
    {code:"400", text:"Bad Request"},
    {code:"401", text:"Unauthorized"},
    {code:"403", text:"Forbidden"},
    {code:"404", text:"Not Found"},
    {code:"405", text:"Method Not Allowed"},
    {code:"429", text:"Too Many Requests"},
    {code:"500", text:"Internal Server Error"},
    {code:"501", text:"Not Implemented"},
    {code:"502", text:"Bad Gateway"},
    {code:"503", text:"Service unavailable"},
    {code:"504", text:"Gateway TimeOut"},
  ]
  private siteUpdated = new Subject<Site[]>();

  constructor(private http: HttpClient) { }

  getStatusCodes() {
    return [...this.statusCodes]
  }

  getSites() {

    this.http.get<Site[]>(SITE_URL)
      .subscribe((body)=> {
        this.sites = body;
        console.log(body);
        this.siteUpdated.next([...this.sites]);

      });
  }

  getSite(id) {
    return this.http.get<Site>(`${SITE_URL}/${id}`);
  }

  getTest(id, siteId) {
    return this.http.get<Test>(`${SITE_URL}/${siteId}/tests/${id}`);
  }

  addSite(site:Site) {
    this.http.post<Site>(SITE_URL, site)
      .subscribe((body:Site)=> {
        this.sites.push(body)
        this.siteUpdated.next([...this.sites]);

      });
  }

  runTest(test: Test) {
    return this.http.post<Log>(`${URL}test/${test.id}/run`, {});
  }

  deleteTest(test: Test) {
    return this.http.delete<Test>(`${URL}apps/${test.app_id}/tests/${test.id}`, {});
  }

  deleteSite(site: Site) {
    return this.http.delete<Site>(`${URL}apps/${site.id}`, {});
  }
  createTest(test:Test) {
    return this.http.post<Test>(`${URL}apps/${test.app_id}/tests`, test);
  }

  updateTest(test: Test) {
    return this.http.put<Test>(`${URL}apps/${test.app_id}/tests/${test.id}`, test);
  }

  getSiteListener() {
    return this.siteUpdated.asObservable();
  }

  testUrl(testUrl:string) {
    return this.http.post(`${URL}test_url`, {url:testUrl});
  }

  runSiteTests(site: Site) {
    return this.http.post<Site>(`${URL}apps/${site.id}/run`, []);
  }
}
