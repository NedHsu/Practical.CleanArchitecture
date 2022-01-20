using ClassifiedAds.Application;
using ClassifiedAds.Application.Users.Queries;
using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassifiedAds.WebAPI.Hubs
{
    [Authorize]
    public class JobHub : Hub
    {
        private readonly Dispatcher _dispatcher;

        public JobHub(Dispatcher dispatcher)
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

        [HubMethodName("SendMessage")]
        public async Task NewMessage(Guid userId, string job)
        {
            await Clients.All.SendAsync("messageReceived", _dispatcher.Dispatch(new GetUserQuery() { Id = userId }).UserName, job).ConfigureAwait(false);
        }
    }
}
