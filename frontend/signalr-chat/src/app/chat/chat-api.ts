import { Injectable, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { catchError, defer, from, map, of, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { toast } from 'ngx-sonner';

export interface Message {
  username: string;
  connectionId: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatApi {
  private connection: HubConnection;
  private baseUrl = environment.apiUrl;
  private groupName = 'testChat';
  user = signal({
    username: '',
    connectionId: '',
  });
  messages = signal<Message[]>([]); // convert to signal
  isConnected = signal(false);
  hasFailed = signal(false);

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
      this.isConnected.set(false);
      console.warn(`Connection lost due to error "${err}". Reconnecting...`);
    });

    this.connection.onclose((err) => {
      this.isConnected.set(false);
      console.error(
        `Connection closed due to error "${err}". Try refreshing this page to restart the connection.`,
      );
    });

    // define message handlers
    this.connection.on('userConnected', (connectionId) => {
      // add message to array
      this.user.update((value) => {
        return {
          ...value,
          connectionId,
        };
      });
    });

    this.connection.on('userJoined', (message, connectionId, userIdentifier) => {
      if (connectionId !== this.user().connectionId && this.user().connectionId !== '')
        toast(message, {
          position: 'top-right',
        });
    });

    this.connection.on(
      'messageReceived',
      (username: string, connectionId: string, message: string) => {
        // TODO: create message object
        // add message to array
        this.messages.update((messages) => [
          ...messages,
          { username, connectionId, text: message },
        ]);
      },
    );
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

      toast.info('Connecting to chat...', {
        position: 'top-right',
      });

      // start connection
      return from(this.connection.start()).pipe(
        map((response) => {
          toast.success('Connected to chat', {
            position: 'top-right',
          });

          this.isConnected.set(true);

          return true;
        }), // TODO: use connection id to map connectionId -> username
        catchError((err) => {
          this.hasFailed.set(true);
          toast.error('Chat failed to start', {
            position: 'top-right',
          });
          console.error('SignalR failed to start', err);
          return throwError(() => err);
        }),
      );
    });
  }

  createUser(username: string) {
    const oldUsername = this.user().username;

    this.user.update((value) => {
      return {
        ...value,
        username,
      };
    });

    this.messages.update((messages) => {
      return messages.map((message) => {
        if (message.username !== oldUsername) return message;

        return {
          ...message,
          username,
        };
      });
    });
  }

  addUserToGroup() {
    if (this.connection.state !== HubConnectionState.Connected) {
      console.warn('SignalR is not yet connected.');
      return;
    }

    this.connection
      .invoke('AddToGroup', this.groupName, this.user().username)
      .then((message) => {})
      .catch((err) => console.error(err));
  }

  /**
   * Sends a user's message to the hub
   * @param message message to send to the hub
   * @returns
   */
  sendMessage(message: string) {
    if (this.connection.state !== HubConnectionState.Connected) {
      console.warn('SignalR is not yet connected.');
      return;
    }

    // TODO: Sanitize input text?

    // don't care about response for now
    this.connection.send(
      'NewMessage',
      this.user().username,
      this.user().connectionId,
      message,
      this.groupName,
    );
  }
}
