import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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

  constructor() {}

  ngOnInit(): void {
    this.chatApi.startConnection().subscribe(() => {
      // send testing message
      this.sendMessage();
    });
  }

  sendMessage() {
    this.chatApi.sendMessage('testUser', 'This is a test');
  }
}
