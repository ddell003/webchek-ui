import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SitesService } from '../services/sites.service';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css']
})
export class EntranceComponent implements OnInit {

  constructor(private siteService: SitesService) { }

  url: string;
  fetchingTest: boolean = false;
  testResults:{code:any, message:string};
  statusCode = null;

  ngOnInit(): void {
  }

  testUrl() {
    if(! this.url){
      return;
    }
    console.log("testing url...", this.url)
    this.fetchingTest = true;
    this.siteService.testUrl(this.url).subscribe((body: {status:number})=> {
      const code = body.status;
     console.log("retreived result", code)
     this.fetchingTest = false;
     this.statusCode = code;
    },
    (error:HttpErrorResponse) => {
      this.fetchingTest = false;

    },);
  }

}
