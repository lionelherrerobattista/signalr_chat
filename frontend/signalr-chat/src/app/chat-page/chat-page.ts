import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatApi, Message } from '../chat/chat-api';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.scss',
})
export class ChatPage implements OnInit {
  chatApi = inject(ChatApi);
  private router = inject(Router);
  messageForm = new FormGroup({
    message: new FormControl(''),
  });

  ngOnInit(): void {
    if (this.chatApi.user().username === '') this.router.navigate(['/']);

    // start connection and add user to group
    this.chatApi.startConnection().subscribe(() => {
      this.chatApi.addUserToGroup();
    });
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

  checkMessageType(message: Message) {
    return message.username === this.chatApi.user().username
      ? 'chat-window__message chat-window__message--outgoing'
      : 'chat-window__message chat-window__message--incoming';
  }
}
