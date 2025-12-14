using Microsoft.AspNetCore.SignalR;

namespace ChatApi.Hubs
{
    public class ChatHub : Hub
    {
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var groupName = Context.Items["group"]?.ToString() ?? "";

            Console.WriteLine(groupName);

            if (!string.IsNullOrEmpty(groupName))
                // not necessary to call remove from group
                await Clients.Group(groupName)
                    .SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");

            await base.OnDisconnectedAsync(exception);
        }
        // add to a group
        public async Task<string> AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            // store group identifier
            Context.Items.Add("group", groupName);

            await Clients.Group(groupName)
                .SendAsync("Send", $"{Context.ConnectionId} has joined the group {groupName}.");

            return $"{Context.ConnectionId} has joined the group {groupName}.";
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName)
                .SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
        }

        // broadcast message to all clients in the group
        public async Task NewMessage(string username, string message, string groupName)
        {
            // send message, don't wait for client to respond
            await Clients.Group(groupName).SendAsync("messageReceived", username, message);
        }

    }
}