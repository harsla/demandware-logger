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
    // update the logs that we are watching
    this.loggerService.setLog('***REMOVED***\"' + key + '\": ' + val + '***REMOVED***');
    if (!val) ***REMOVED***
      //remove any exiting logs of that type
      this.messages = this.messages.filter(function(obj) ***REMOVED***
        return !(obj.name === key);
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***

  ngOnDestroy() ***REMOVED***
    this.connection.unsubscribe();
  ***REMOVED***

***REMOVED***
