# SignalR Chat


# User stories

- UI
  - [x] Three pages/components: Landing -> Username -> Chat.
  - [ ] Create route guards when username is not defined?
  - [ ] Add animation to page change.
  - [ ] home
    - [ ] Add hero elements.
    - [x] Style create-user button to start app.
    - [x] Add image.
  - [ ] create-user
    - [ ] Add button animation.
    - [ ] Add form validation.
    - [ ] Add form validation messages.
    - [x] Add back button.
    - [ ] Reset stored messages if any.
    - [ ] Show stored name and allow to change it.
  - [ ] chat-page
    - [x] Redirect to home if no username.
    - [x] Add home button.
    - [ ] Change username button ? Profile page?
    - [x] test long message.
    - [ ] Guard before leaving the page?


## Bugs

- [ ] If users use the same username, both messages appear as outgoing.
- [ ] If users goes back to the home and returns to the chat screen, the previous messages are still there.