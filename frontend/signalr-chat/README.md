# SignalR Chat


# User stories

- [ ] General UI
  - [x] Three pages/components: Landing -> Username -> Chat.
  - [ ] Create route guards when username is not defined?
  - [x] Add animation to page change.
- [ ] home
  - [x] Add hero elements.
  - [x] Style create-user button to start app.
  - [x] Add image.
  - [ ] Slides from the left when going back to home.
- [ ] create-user
  - [x] Add button animation.
  - [x] Add form validation.
  - [x] Add form validation messages.
  - [x] Add back button.
  - [ ] Reset stored messages if any.
  - [x] Show stored name and allow to change it.
- [ ] chat-page
  - [x] Redirect to home if no username.
  - [x] Add home button.
  - [ ] Change username button ? Profile page?
  - [x] test long message.
  - [ ] Guard before leaving the page?
  - [x] Username in bold
- [ ] Refactor
  - [ ] Improve scss classes. Avoid code repetition.


## Bugs

- [x] If users use the same username, both messages appear as outgoing.
- [ ] If user changes name, the message appears as outgoing.
