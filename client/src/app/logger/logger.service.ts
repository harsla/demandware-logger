import ***REMOVED*** Injectable ***REMOVED*** from '@angular/core';
import ***REMOVED*** Observable ***REMOVED*** from 'rxjs/Observable';
import * as io from 'socket.io-client';
import 'rxjs/Rx';

@Injectable()
export class LoggerService ***REMOVED***
  private url = 'http://localhost:3000';
  private socket;

  constructor() ***REMOVED*** ***REMOVED***

  getMessages() ***REMOVED***

    let observable = new Observable(observer => ***REMOVED***
      this.socket = io(this.url);

      this.socket.on('message', (data) => ***REMOVED***
        observer.next(data);
      ***REMOVED***);

      return () => ***REMOVED***
        this.socket.disconnect();
      ***REMOVED***;
    ***REMOVED***);

    return observable;
  ***REMOVED***

  getLogs() ***REMOVED***

    let observable = new Observable(observer => ***REMOVED***
      this.socket = io(this.url);

      this.socket.on('logs', (data) => ***REMOVED***
        observer.next(data);
      ***REMOVED***);
      return () => ***REMOVED***
        this.socket.disconnect();
      ***REMOVED***;
    ***REMOVED***);

    return observable;

  ***REMOVED***

  setLog(event) ***REMOVED***
    this.socket.emit('updateLogs', event);
  ***REMOVED***

***REMOVED***
