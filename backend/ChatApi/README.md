# SignalR Chat

## Run app

```bash
dotnet watch run
```

Or start the container:

```bash
docker build -t signalr-chat-backend .
docker run -p 5000:8080 signalr-chat-backend
```

Or start from docker compose:

```bash
docker-compose up --build
docker-compose up -d
```


# User stories

- [ ] Add endpoint to generate chat-rooms.
- [ ] Store chat-rooms in a database.
- [x] Add rate limiter
- [ ] Add throttling.
- [ ] Add message validations.
- [ ] Add secure headers.
- [ ] Anonymous tokens?
- [ ] Receive user object in NewMessage?

## Bugs

- [ ] Exception when the user returns to the chat after exiting the screen.