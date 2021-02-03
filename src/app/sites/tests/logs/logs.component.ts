import { Component, Input, OnInit } from '@angular/core';
import { Log } from 'src/app/models/log.model';
import * as moment from 'moment';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor() { }

  @Input() logs: Log[];
  ngOnInit(): void {
  }

  getLastRanTime(time) {
    if(! time){
      return "";
    }
    return moment(time).fromNow();
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

}
