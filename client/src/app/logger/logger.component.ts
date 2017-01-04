import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoggerService} from './logger.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css'],
  providers: [LoggerService]
})
export class LoggerComponent implements OnInit, OnDestroy {
  messages = [];
  logs;
  connection;
  message;

  constructor(private loggerService: LoggerService) {

  }

  ngOnInit() {
    this.loggerService.getMessages().subscribe(message => {
      //this.messages.push(message); //add to end of array
      this.messages.unshift(message);
    });

    this.loggerService.getLogs().subscribe(logs => {
      this.logs = logs;
    });

  }

  setLogs(key, val) {
    // update the logs that we are watching
    this.loggerService.setLog('{\"' + key + '\": ' + val + '}');
    if (!val) {
      //remove any exiting logs of that type
      this.messages = this.messages.filter(function(obj) {
        return !(obj.name === key);
      });
    }
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
