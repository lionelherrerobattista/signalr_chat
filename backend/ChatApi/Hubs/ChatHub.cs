using Microsoft.AspNetCore.SignalR;

namespace ChatApi.Hubs
{
    public class ChatHub : Hub
    {
        // broadcast message to all clients
        public async Task NewMessage(string username, string message)
        {
            // send message, don't wait for client to respond
            await Clients.All.SendAsync("messageReceived", username, message);
        }

    }
}