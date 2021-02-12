using ClassifiedAds.Application;
using ClassifiedAds.Application.AuditLogEntries.DTOs;
using ClassifiedAds.Application.AuditLogEntries.Queries;
using ClassifiedAds.Application.CalendarEvents.Commands;
using ClassifiedAds.Application.CalendarEvents.DTOs;
using ClassifiedAds.Application.CalendarEvents.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.CalendarEvents;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class CalendarEventsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;

        public CalendarEventsController(Dispatcher dispatcher, ILogger<CalendarEventsController> logger)
        {
            _dispatcher = dispatcher;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<CalendarEvent>> Get()
        {
            _logger.LogInformation("Getting all calendarevents");
            var calendarevents = _dispatcher.Dispatch(new GetCalendarEventsQuery());
            var model = calendarevents.ToDTOs();
            return Ok(model);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CalendarEvent> Get(Guid id)
        {
            var calendarevent = _dispatcher.Dispatch(new GetCalendarEventQuery { Id = id, ThrowNotFoundIfNull = true });
            var model = calendarevent.ToDTO();
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<CalendarEvent> Post([FromBody] CalendarEventModel model)
        {
            var calendarevent = model.ToEntity();
            _dispatcher.Dispatch(new AddUpdateCalendarEventCommand { CalendarEvent = calendarevent });
            model = calendarevent.ToDTO();
            return Created($"/api/calendarevents/{model.Id}", model);
        }

        [HttpPut("{id}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(Guid id, [FromBody] CalendarEventModel model)
        {
            var calendarevent = _dispatcher.Dispatch(new GetCalendarEventQuery { Id = id, ThrowNotFoundIfNull = true });


            _dispatcher.Dispatch(new AddUpdateCalendarEventCommand { CalendarEvent = calendarevent });

            model = calendarevent.ToDTO();

            return Ok(model);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(Guid id)
        {
            var calendarevent = _dispatcher.Dispatch(new GetCalendarEventQuery { Id = id, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteCalendarEventCommand { CalendarEvent = calendarevent });

            return Ok();
        }

        [HttpGet("{id}/auditlogs")]
        public ActionResult<IEnumerable<AuditLogEntryDTO>> GetAuditLogs(Guid id)
        {
            var logs = _dispatcher.Dispatch(new GetAuditEntriesQuery { ObjectId = id.ToString() });

            List<dynamic> entries = new List<dynamic>();
            CalendarEventDTO previous = null;
            foreach (var log in logs.OrderBy(x => x.CreatedDateTime))
            {
                var data = JsonConvert.DeserializeObject<CalendarEventDTO>(log.Log);
                var highLight = new
                {
                    Code = previous != null && data.Code != previous.Code,
                    Name = previous != null && data.Name != previous.Name,
                    Description = previous != null && data.Description != previous.Description,
                };

                var entry = new
                {
                    log.Id,
                    log.UserName,
                    Action = log.Action.Replace("_PRODUCT", string.Empty),
                    log.CreatedDateTime,
                    data,
                    highLight,
                };
                entries.Add(entry);

                previous = data;
            }

            return Ok(entries.OrderByDescending(x => x.CreatedDateTime));
        }
    }
}