# Chat App

Chat app created using Angular and .NET with SignalR where a user can connect to a chat room and text with other users. The users select a username and can send messages to each other.

⚠️ This project is a learning prototype and is not production-ready.


## Technologies

- Angular
- .NET
- SignalR
- npm workspaces

## Quick start

Start the app using docker compose:

```bash
docker-compose up --build
docker-compose up -d
```

Start the app for local development:

```bash
npm i
npm run dev
```

## Usage example

Click the Start chatting button:

![Start chatting](/docs/images//homepage.png)

Create your username:

![Create username](/docs/images/create-user.png)

Start chatting:

![Chat component](/docs/images/chat-component.png)



## Project structure


- Monorepo:
  - Frontend:
    - Angular
  - Backend:
    - .NET
    - SignalR
