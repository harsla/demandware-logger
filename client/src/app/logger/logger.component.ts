import ***REMOVED***Component, OnInit, OnDestroy***REMOVED*** from '@angular/core';
import ***REMOVED***LoggerService***REMOVED*** from './logger.service';
import ***REMOVED***Observable***REMOVED*** from "rxjs";

@Component(***REMOVED***
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css'],
  providers: [LoggerService]
***REMOVED***)
export class LoggerComponent implements OnInit, OnDestroy ***REMOVED***
  messages = [];
  logs;
  connection;
  message;

  constructor(private loggerService: LoggerService) ***REMOVED***

  ***REMOVED***

  ngOnInit() ***REMOVED***
    this.loggerService.getMessages().subscribe(message => ***REMOVED***
      //this.messages.push(message); //add to end of array
      this.messages.unshift(message);
    ***REMOVED***);

    this.loggerService.getLogs().subscribe(logs => ***REMOVED***
      this.logs = logs;
    ***REMOVED***);

  ***REMOVED***

  setLogs(key, val) ***REMOVED***
    this.loggerService.setLog('***REMOVED***\"' + key + '\": '+  val + '***REMOVED***');
  ***REMOVED***

  ngOnDestroy() ***REMOVED***
    this.connection.unsubscribe();
  ***REMOVED***

***REMOVED***
