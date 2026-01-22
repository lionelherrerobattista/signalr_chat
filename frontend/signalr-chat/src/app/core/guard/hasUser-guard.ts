import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { ChatApi } from '../../chat/chat-api';
import { inject } from '@angular/core';

export const hasUserGuard: CanActivateFn = (route, state) => {
  const chatApi = inject(ChatApi);
  const router = inject(Router);

  if (chatApi.user().username === '') {
    const homePath = router.parseUrl('/');
    return new RedirectCommand(homePath);
  }

  return true;
};
