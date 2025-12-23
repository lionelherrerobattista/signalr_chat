import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatApi } from '../chat/chat-api';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.scss',
})
export class CreateUser {
  chatApi = inject(ChatApi);

  usernameForm = new FormGroup({
    username: new FormControl(''),
  });

  onSubmitUsername() {
    const { username } = this.usernameForm.value;

    if (username) this.chatApi.createUser(username);

    this.usernameForm.reset();
  }
}
