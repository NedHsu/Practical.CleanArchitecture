using ClassifiedAds.Application;
using ClassifiedAds.Application.Users.Queries;
using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace ClassifiedAds.WebAPI.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly Dispatcher _dispatcher;

        public ChatHub(Dispatcher dispatcher)
        {
            _dispatcher = dispatcher;
        }

        public override async Task OnConnectedAsync()
        {
            await NewMessage(Context.User.GetUserId(), "Connected");
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await NewMessage(Context.User.GetUserId(), "Disconnected");
        }

        [HubMethodName("SendMessageToUser")]
        public async Task NewMessage(Guid userId, string message)
        {
            await Clients.All.SendAsync("messageReceived", _dispatcher.Dispatch(new GetUserQuery() { Id = userId }).UserName, message).ConfigureAwait(false);
        }

        [HubMethodName("SendMessageSelf")]
        public async Task NewMessage(string message)
        {
            await Clients.Client(Context.ConnectionId).SendAsync("messageReceived", _dispatcher.Dispatch(new GetUserQuery() { Id = Guid.Parse(Context.UserIdentifier) }).UserName, message).ConfigureAwait(false);
        }
    }
}
