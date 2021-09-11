using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.CalendarCategories.Commands;
using ClassifiedAds.Application.CalendarCategories.DTOs;
using ClassifiedAds.Application.CalendarCategories.Queries;
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
    public class CalendarCategoriesController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public CalendarCategoriesController(Dispatcher dispatcher, ILogger<CalendarCategoriesController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<CalendarCategoryModel>> Get()
        {
            _logger.LogInformation("Getting all tmpitems");
            var tmpitems = _dispatcher.Dispatch(new GetCalendarCategoriesQuery() { });
            var model = _mapper.Map<IEnumerable<CalendarCategoryModel>>(tmpitems);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<CalendarCategory> Post([FromBody] CalendarCategoryModel model)
        {
            var tmpitem = _mapper.Map<CalendarCategory>(model);
            _dispatcher.Dispatch(new AddUpdateCalendarCategoryCommand { CalendarCategory = tmpitem });
            model = _mapper.Map<CalendarCategoryModel>(tmpitem);
            return Created($"/api/tmpitems/{model.Id}", model);
        }

        [HttpPut("{id}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(int id, [FromBody] CalendarCategoryModel model)
        {
            var tmpitem = _dispatcher.Dispatch(new GetCalendarCategoryQuery { Id = id, ThrowNotFoundIfNull = false })
                ?? new CalendarCategory { };

            tmpitem.Name = model.Name;

            _dispatcher.Dispatch(new AddUpdateCalendarCategoryCommand { CalendarCategory = tmpitem });

            model = _mapper.Map<CalendarCategoryModel>(tmpitem);

            return Ok(model);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(int id)
        {
            var tmpitem = _dispatcher.Dispatch(new GetCalendarCategoryQuery { Id = id, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteCalendarCategoryCommand { CalendarCategory = tmpitem });

            return Ok();
        }
    }
}