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
  messageForm = new FormGroup({
    message: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    this.chatApi.startConnection().subscribe();
  }

  sendMessage(message: string) {
    this.chatApi.sendMessage('testUser', message);
  }

  onSubmit() {
    // retrieve message and send it to the hub
    const { message } = this.messageForm.value;

    if (message) this.sendMessage(message);

    this.messageForm.reset();
  }
}
