import { Injectable, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { catchError, defer, from, map, of, throwError } from 'rxjs';

export interface Message {
  text: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatApi {
  private connection: HubConnection;
  private baseUrl = 'http://localhost:5137';
  private groupName = 'testChat';
  // TODO: save messages sent and received
  messages = signal<Message[]>([]); // convert to signal

  constructor() {
    // initialize connection and handlers
    this.connection = new HubConnectionBuilder()
      .withUrl(this.baseUrl + '/hub')
      .withAutomaticReconnect()
      .build();

    this.createHandlers();
  }

  /**
   * Creates the handlers for the SignalR connection
   */
  private createHandlers() {
    // handle to reconnect with the server on disconnect
    this.connection.onreconnecting((err) => {
      console.warn(`Connection lost due to error "${err}". Reconnecting...`);
    });

    this.connection.onclose((err) => {
      console.error(
        `Connection closed due to error "${err}". Try refreshing this page to restart the connection.`
      );
    });

    // define message handlers

    this.connection.on('messageReceived', (username: string, message: string) => {
      console.log(`${username}: ${message}`);
      // add message to array
      this.messages.update((messages) => [...messages, { username, text: message }]);
    });
  }

  /**
   * Starts the connection with the SignalR hub
   * @returns true if the hub is connected
   */
  startConnection() {
    // TODO: attemp manual reconnection ?

    // return observable, lazy
    return defer(() => {
      // check if already connected
      if (this.connection.state === HubConnectionState.Connected)
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

  addUserToGroup() {
    if (this.connection.state !== HubConnectionState.Connected) {
      console.warn('SignalR is not yet connected.');
      return;
    }

    this.connection.invoke('AddToGroup', this.groupName).then((message) => console.log(message));
  }

  /**
   * Sends a user's message to the hub
   * @param user user that sends the message
   * @param message message to send to the hub
   * @returns
   */
  sendMessage(user: string, message: string) {
    if (this.connection.state !== HubConnectionState.Connected) {
      console.warn('SignalR is not yet connected.');
      return;
    }

    // don't care about response for now
    this.connection.send('NewMessage', user, message, this.groupName);
  }
}
