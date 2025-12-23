import { Component, inject, OnInit, signal } from '@angular/core';
import { CreateUser } from '../create-user/create-user';
import { ChatPage } from '../chat-page/chat-page';
import { ChatApi } from '../chat/chat-api';

@Component({
  selector: 'app-home',
  imports: [CreateUser, ChatPage],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  text = signal('');
  chatApi = inject(ChatApi);

  constructor() {}

  ngOnInit(): void {
    // start connection and add user to group
    this.chatApi.startConnection().subscribe(() => this.chatApi.addUserToGroup());
  }
}
