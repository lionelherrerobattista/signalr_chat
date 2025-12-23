import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatApi } from '../chat/chat-api';

@Component({
  selector: 'app-chat-page',
  imports: [ReactiveFormsModule],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.scss',
})
export class ChatPage {
  chatApi = inject(ChatApi);
  messageForm = new FormGroup({
    message: new FormControl(''),
  });

  sendMessage(message: string) {
    this.chatApi.sendMessage(message);
  }

  onSubmit() {
    // retrieve message and send it to the hub
    const { message } = this.messageForm.value;

    if (message) this.sendMessage(message);

    this.messageForm.reset();
  }
}
