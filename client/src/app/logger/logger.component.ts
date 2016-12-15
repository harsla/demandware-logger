import ***REMOVED*** Component, OnInit, OnDestroy ***REMOVED*** from '@angular/core';
import ***REMOVED*** LoggerService ***REMOVED*** from './logger.service';

@Component(***REMOVED***
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css'],
  providers: [LoggerService]
***REMOVED***)
export class LoggerComponent implements OnInit, OnDestroy ***REMOVED***
  messages = [];
  connection;
  message;

  constructor(private loggerService:LoggerService) ***REMOVED*** ***REMOVED***

  ngOnInit() ***REMOVED***
    this.connection = this.loggerService.getMessages().subscribe(message => ***REMOVED***
      this.messages.push(message);
    ***REMOVED***)
  ***REMOVED***

  ngOnDestroy() ***REMOVED***
    this.connection.unsubscribe();
  ***REMOVED***

***REMOVED***
