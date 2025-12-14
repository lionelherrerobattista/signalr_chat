import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatApi } from './chat/chat-api';

// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  text = signal('');
  chatApi = inject(ChatApi);
  usernameForm = new FormGroup({
    username: new FormControl(''),
  });
  messageForm = new FormGroup({
    message: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    // start connection and add user to group
    this.chatApi.startConnection().subscribe(() => this.chatApi.addUserToGroup());
  }

  sendMessage(message: string) {
    this.chatApi.sendMessage(message);
  }

  onSubmit() {
    // retrieve message and send it to the hub
    const { message } = this.messageForm.value;

    if (message) this.sendMessage(message);

    this.messageForm.reset();
  }

  onSubmitUsername() {
    const { username } = this.usernameForm.value;

    if (username) this.chatApi.createUser(username);

    this.usernameForm.reset();
  }
}
