import { Component, inject, OnInit } from '@angular/core';
import { ChatApi } from '../chat/chat-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private chatApi = inject(ChatApi);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    // start connection and add user to group
    this.chatApi.startConnection().subscribe(() => this.chatApi.addUserToGroup());
  }

  navigateToUserCreation() {
    this.router.navigate(['/create-user']);
  }
}
