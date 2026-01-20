import { CanActivateFn, Router } from '@angular/router';
import { ChatApi } from '../../chat/chat-api';
import { inject } from '@angular/core';

export const hasUserGuard: CanActivateFn = (route, state) => {
  const chatApi = inject(ChatApi);
  const router = inject(Router);

  if (chatApi.user().username === '') {
    router.navigate(['/']);
    return false;
  }

  return true;
};
