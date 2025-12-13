import { Component, OnInit, signal } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';

// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  text = signal('');
  connection: HubConnection;

  constructor() {
    // create connection
    this.connection = new HubConnectionBuilder().withUrl('http://localhost:5137/hub').build();
  }

  ngOnInit(): void {
    // define handlers
    this.connection.on('messageReceived', (username: string, message: string) => {
      console.log(`${username}: ${message} `);
    });

    // start connection
    this.connection
      .start()
      .then(() => {
        // Call a method from hub
        this.connection.send('NewMessage', 'testUser', 'This is a test.');
      })
      .catch((err) => console.error(err));
  }
}
