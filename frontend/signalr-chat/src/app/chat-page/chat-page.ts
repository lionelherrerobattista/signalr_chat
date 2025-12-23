import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatApi } from '../chat/chat-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  imports: [ReactiveFormsModule],
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
    console.log(this.chatApi.user().username);
    if (this.chatApi.user().username === '') this.router.navigate(['/']);
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
}
