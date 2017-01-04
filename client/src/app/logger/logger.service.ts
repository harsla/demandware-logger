import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import 'rxjs/Rx';

@Injectable()
export class LoggerService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() { }

  getMessages() {

    let observable = new Observable(observer => {
      this.socket = io(this.url);

      this.socket.on('message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }

  getLogs() {

    let observable = new Observable(observer => {
      this.socket = io(this.url);

      this.socket.on('logs', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;

  }

  setLog(event) {
    this.socket.emit('updateLogs', event);
  }

}
