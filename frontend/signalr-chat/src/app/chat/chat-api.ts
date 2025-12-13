import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { catchError, defer, from, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatApi {
  private connection: HubConnection;
  private baseUrl = 'http://localhost:5137';

  constructor() {
    // initialize connection and handlers
    this.connection = new HubConnectionBuilder().withUrl(this.baseUrl + '/hub').build();

    this.createHandlers();
  }

  private createHandlers() {
    // define handlers
    this.connection.on('messageReceived', (username: string, message: string) => {
      console.log(`${username}: ${message} `);
    });
  }

  startConnection() {
    // return observable, lazy
    return defer(() => {
      // check if already connected
      if (this.connection.state == HubConnectionState.Connected)
        // or return of(this.connection); expose connection obj?
        return of(true);

      // start connection
      return from(this.connection.start()).pipe(
        map(() => true), // or return connection
        catchError((err) => {
          console.error('SignalR failed to start', err);
          return throwError(() => err);
        })
      );
    });
  }

  sendMessage(user: string, message: string) {
    if (this.connection.state !== HubConnectionState.Connected) {
      console.warn('SignalR is not yet connected.');
      return;
    }

    // don't care about response for now
    this.connection.send('NewMessage', user, message);
  }
}
