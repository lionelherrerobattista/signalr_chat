import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatApi } from '../chat/chat-api';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-user.html',
  styleUrl: './create-user.scss',
})
export class CreateUser {
  private chatApi = inject(ChatApi);
  private router = inject(Router);
  usernameForm = new FormGroup({
    username: new FormControl(''),
  });

  onSubmitUsername() {
    const { username } = this.usernameForm.value;

    if (username) {
      this.chatApi.createUser(username);
      this.usernameForm.reset();
      this.router.navigate(['/chat']);
      return;
    }

    this.usernameForm.reset();
  }
}
