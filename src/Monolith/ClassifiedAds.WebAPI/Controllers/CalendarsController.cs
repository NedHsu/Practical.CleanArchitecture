using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.Calendars.Commands;
using ClassifiedAds.Application.Calendars.DTOs;
using ClassifiedAds.Application.Calendars.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.Calendars;
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
    public class CalendarsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public CalendarsController(Dispatcher dispatcher, ILogger<CalendarsController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<CalendarModel>> Get()
        {
            _logger.LogInformation("Getting all tmpitems");
            var tmpitems = _dispatcher.Dispatch(new GetCalendarsQuery() { });
            var model = _mapper.Map<IEnumerable<CalendarModel>>(tmpitems);
            return Ok(model);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CalendarModel> Get(Guid id)
        {
            var tmpitem = _dispatcher.Dispatch(new GetCalendarQuery { Id = id, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<CalendarModel>(tmpitem);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<Calendar> Post([FromBody] CalendarModel model)
        {
            var tmpitem = _mapper.Map<Calendar>(model);
            _dispatcher.Dispatch(new AddUpdateCalendarCommand { Calendar = tmpitem });
            model = _mapper.Map<CalendarModel>(tmpitem);
            return Created($"/api/tmpitems/{model.Code}", model);
        }

        [HttpPut("{id}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(Guid id, [FromBody] CalendarModel model)
        {
            var tmpitem = _dispatcher.Dispatch(new GetCalendarQuery { Id = id, ThrowNotFoundIfNull = false })
                ?? new Calendar { };

            tmpitem.Name = model.Name;

            _dispatcher.Dispatch(new AddUpdateCalendarCommand { Calendar = tmpitem });

            model = _mapper.Map<CalendarModel>(tmpitem);

            return Ok(model);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(Guid id)
        {
            var tmpitem = _dispatcher.Dispatch(new GetCalendarQuery { Id = id, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteCalendarCommand { Calendar = tmpitem });

            return Ok();
        }
    }
}