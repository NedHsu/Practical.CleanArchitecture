using ClassifiedAds.Application;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassifiedAds.WebAPI.Hubs
{
    public class NotificationHub : Hub
    {
        private readonly Dispatcher _dispatcher;

        public NotificationHub(Dispatcher dispatcher)
        {
            _dispatcher = dispatcher;
        }

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
    }
}
