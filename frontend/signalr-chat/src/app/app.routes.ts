import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CreateUser } from './create-user/create-user';
import { ChatPage } from './chat-page/chat-page';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'create-user',
    component: CreateUser,
  },
  {
    path: 'chat',
    component: ChatPage,
  },
];
