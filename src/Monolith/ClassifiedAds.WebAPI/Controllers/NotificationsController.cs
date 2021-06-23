using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.AuditLogEntries.DTOs;
using ClassifiedAds.Application.AuditLogEntries.Queries;
using ClassifiedAds.Application.Notifications.Commands;
using ClassifiedAds.Application.Notifications.DTOs;
using ClassifiedAds.Application.Notifications.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Hubs;
using ClassifiedAds.WebAPI.Models.Notifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.WebAPI.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public NotificationsController(Dispatcher dispatcher, ILogger<NotificationsController> logger, IMapper mapper, IHubContext<NotificationHub> hubContext)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
            _hubContext = hubContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<NotificationModel>> Get()
        {
            _logger.LogInformation("Getting all notifications");
            var notifications = _dispatcher.Dispatch(new GetNotificationsQuery(){ });
            var model = _mapper.Map<IEnumerable<NotificationModel>>(notifications);
            return Ok(model);
        }

        [HttpGet("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<NotificationModel> Get(Guid id)
        {
            var notification = _dispatcher.Dispatch(new GetNotificationQuery { Id = id, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<NotificationModel>(notification);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<Notification> Post([FromBody] NotificationSenderModel model)
        {
            var notification = _mapper.Map<Notification>(model);
            _dispatcher.Dispatch(new AddUpdateNotificationCommand { Notification = notification });
            return Created($"/api/notifications/{model.Id}", model);
        }

        [HttpPut("{code}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(Guid id, [FromBody] NotificationModel model)
        {
            var notification = _dispatcher.Dispatch(new GetNotificationQuery { Id = id, ThrowNotFoundIfNull = false }) 
                ?? new Notification { };

            notification.Content = model.Content;

            _dispatcher.Dispatch(new AddUpdateNotificationCommand { Notification = notification });

            model = _mapper.Map<NotificationModel>(notification);

            return Ok(model);
        }

        [HttpDelete("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(Guid id)
        {
            var notification = _dispatcher.Dispatch(new GetNotificationQuery { Id = id, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteNotificationCommand { Notification = notification });

            return Ok();
        }
    }
}