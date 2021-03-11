using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.AuditLogEntries.DTOs;
using ClassifiedAds.Application.AuditLogEntries.Queries;
using ClassifiedAds.Application.StockDays.Commands;
using ClassifiedAds.Application.StockDays.DTOs;
using ClassifiedAds.Application.StockDays.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.StockDays;
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
    public class StockDaysController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public StockDaysController(Dispatcher dispatcher, ILogger<StockDaysController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<StockDayModel>> Get()
        {
            _logger.LogInformation("Getting all stockdays");
            var stockdays = _dispatcher.Dispatch(new GetStockDaysQuery(){ });
            var model = _mapper.Map<IEnumerable<StockDayModel>>(stockdays);
            return Ok(model);
        }

        [HttpGet("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<StockDayModel> Get(string code)
        {
            var stockday = _dispatcher.Dispatch(new GetStockDayQuery { Code = code, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<StockDayModel>(stockday);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<StockDay> Post([FromBody] StockDayModel model)
        {
            var stockday = _mapper.Map<StockDay>(model);
            _dispatcher.Dispatch(new AddUpdateStockDayCommand { StockDay = stockday });
            model = _mapper.Map<StockDayModel>(stockday);
            return Created($"/api/stockdays/{model.Code}", model);
        }

        [HttpPut("{code}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(string code, [FromBody] StockDayModel model)
        {
            var stockday = _dispatcher.Dispatch(new GetStockDayQuery { Code = code, ThrowNotFoundIfNull = false }) 
                ?? new StockDay { };

            stockday.StockCode = model.Code;

            _dispatcher.Dispatch(new AddUpdateStockDayCommand { StockDay = stockday });

            model = _mapper.Map<StockDayModel>(stockday);

            return Ok(model);
        }

        [HttpDelete("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(string code)
        {
            var stockday = _dispatcher.Dispatch(new GetStockDayQuery { Code = code, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteStockDayCommand { StockDay = stockday });

            return Ok();
        }

        [HttpGet("{id}/auditlogs")]
        public ActionResult<IEnumerable<AuditLogEntryDTO>> GetAuditLogs(Guid id)
        {
            var logs = _dispatcher.Dispatch(new GetAuditEntriesQuery { ObjectId = id.ToString() });

            List<dynamic> entries = new List<dynamic>();
            StockDayDTO previous = null;
            foreach (var log in logs.OrderBy(x => x.CreatedDateTime))
            {
                var data = JsonConvert.DeserializeObject<StockDayDTO>(log.Log);
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
                    Action = log.Action.Replace("_STOCK", string.Empty),
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