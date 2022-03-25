using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.AuditLogEntries.DTOs;
using ClassifiedAds.Application.AuditLogEntries.Queries;
using ClassifiedAds.Application.StockMargins.Commands;
using ClassifiedAds.Application.StockMargins.DTOs;
using ClassifiedAds.Application.StockMargins.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.StockMargins;
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
    public class StockMarginsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public StockMarginsController(Dispatcher dispatcher, ILogger<StockMarginsController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<StockMarginModel>> Get([FromQuery] GetStockMarginsQuery query)
        {
            _logger.LogInformation("Getting all stockmargins");
            var stockmargins = _dispatcher.Dispatch(query);
            var model = _mapper.Map<IEnumerable<StockMarginModel>>(stockmargins);
            return Ok(model);
        }

        [HttpGet("funders")]
        public ActionResult<StockMarginFundersModel> GetWithFunders([FromQuery] GetStockMarginFundersQuery query)
        {
            _logger.LogInformation("Getting all stockmarginfunders");
            var stockmargins = _dispatcher.Dispatch(query);
            var model = _mapper.Map<StockMarginFundersModel>(stockmargins.OrderBy(x => x.Date).ToList());
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<StockMargin> Post([FromBody] StockMarginModel model)
        {
            var stockmargin = _mapper.Map<StockMargin>(model);
            _dispatcher.Dispatch(new AddUpdateStockMarginCommand { StockMargin = stockmargin });
            model = _mapper.Map<StockMarginModel>(stockmargin);
            return Created($"/api/stockmargins/{model.Code}", model);
        }

        [HttpGet("{id}/auditlogs")]
        public ActionResult<IEnumerable<AuditLogEntryDTO>> GetAuditLogs(Guid id)
        {
            var logs = _dispatcher.Dispatch(new GetAuditEntriesQuery { ObjectId = id.ToString() });

            List<dynamic> entries = new List<dynamic>();
            StockMarginDTO previous = null;
            foreach (var log in logs.OrderBy(x => x.CreatedDateTime))
            {
                var data = JsonConvert.DeserializeObject<StockMarginDTO>(log.Log);
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