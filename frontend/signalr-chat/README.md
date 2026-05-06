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

## Technologies

- Angular
- SignalR
- ngx-sonner

## User stories

- [ ] General UI
  - [x] Change `vh` unit to `svh` or `dvh` to avoid extra scrolling.
  - [x] Change favicon.
  - [x] Three pages/components: Landing -> Username -> Chat.
  - [x] Create route guards when username is not defined.
  - [x] Add animation to page change.
  - [x] Add error messages.
  - [x] Prevent accesing the chat if the service is not available.
  - [ ] Add dark mode.

- [ ] `home`
  - [x] Add hero elements.
  - [x] Style create-user button to start app.
  - [x] Add image.
  - [ ] Slides from the left when going back to home.

- [ ] `create-user`
  - [x] Add button animation.
  - [x] Add form validation.
  - [x] Add form validation messages.
  - [x] Add back button.
  - [ ] Reset stored messages if any.
  - [x] Show stored name and allow to change it.

- [ ] `chat-page`
  - [x] Add connecting message while SignalR connection is in progress.
  - [x] Add user connected message in chat
  - [ ] Avoid connecting when username is not defined
  - [x] Redirect to home if no username.
  - [x] Add home button.
  - [ ] Change username button ? Profile page?
  - [x] test long message.
  - [ ] Guard before leaving the page?
  - [x] Username in bold

- [ ] `chat-api`
  - [ ] create `checkConnection()` function.

- [ ] Refactor
  - [ ] Improve scss classes. Avoid code repetition.
  - [ ] Store the mapping between connectionId and user in a separate data structure?
  - [ ] Send user object to backend(?)
  - [ ] Create user service(?)

## Bugs

- [x] If users use the same username, both messages appear as outgoing.
- [x] If user changes name, the message appears as outgoing.
- [x] Redirection from /chat to home not working in production.
- [ ] User can't reconnect.
- [ ] Content too wide on mobile (chrome Samsung A53)

## Components

- `home`
  - Initial view.
  - Hero section and button to enter the chat room.
- `create-user`
  - View to enter or edit the username.
- `chat`
  - Chat view.
  - Connects to SignalR API.
  - Allows to send messages to the connected users.

## Services

- `chat-api`
  - Handles requests to the SignalR API.
  - Defines a set of handlers to respond to different events.
  - Starts the connection to the SignalR hub.
  - Sets the username.
  - Add user to group.

