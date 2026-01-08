# SignalR Chat

## Run app

```bash
npm run start
```

Or start the container:

```bash
docker build -t signalr-chat-frontend .
docker run -p 4200:80 signalr-chat-frontend
```

Or start from docker compose:

```bash
docker-compose up --build
docker-compose up -d
```

# User stories

- [ ] General UI
  - [x] Three pages/components: Landing -> Username -> Chat.
  - [ ] Create route guards when username is not defined?
  - [x] Add animation to page change.
  - [ ] Add error messages. 
  - [ ] Prevent accesing the chat if the service is not available.
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
  - [ ] Store the mapping between connectionId and user in a separate data structure?
  - [ ] Send user object to backend?



## Bugs

- [x] If users use the same username, both messages appear as outgoing.
- [x] If user changes name, the message appears as outgoing.
