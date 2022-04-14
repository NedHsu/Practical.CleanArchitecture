﻿using ClassifiedAds.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace ClassifiedAds.WebAPI.Hubs
{
    [Authorize]
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
