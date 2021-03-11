using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.AuditLogEntries.DTOs;
using ClassifiedAds.Application.AuditLogEntries.Queries;
using ClassifiedAds.Application.StockFundamentals.Commands;
using ClassifiedAds.Application.StockFundamentals.DTOs;
using ClassifiedAds.Application.StockFundamentals.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.StockFundamentals;
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
    public class StockFundamentalsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public StockFundamentalsController(Dispatcher dispatcher, ILogger<StockFundamentalsController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<StockFundamentalModel>> Get()
        {
            _logger.LogInformation("Getting all stockfundamentals");
            var stockfundamentals = _dispatcher.Dispatch(new GetStockFundamentalsQuery(){ });
            var model = _mapper.Map<IEnumerable<StockFundamentalModel>>(stockfundamentals);
            return Ok(model);
        }

        [HttpGet("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<StockFundamentalModel> Get(string code)
        {
            var stockfundamental = _dispatcher.Dispatch(new GetStockFundamentalQuery { Code = code, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<StockFundamentalModel>(stockfundamental);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<StockFundamental> Post([FromBody] StockFundamentalModel model)
        {
            var stockfundamental = _mapper.Map<StockFundamental>(model);
            _dispatcher.Dispatch(new AddUpdateStockFundamentalCommand { StockFundamental = stockfundamental });
            model = _mapper.Map<StockFundamentalModel>(stockfundamental);
            return Created($"/api/stockfundamentals/{model.Code}", model);
        }

        [HttpPut("{code}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(string code, [FromBody] StockFundamentalModel model)
        {
            var stockfundamental = _dispatcher.Dispatch(new GetStockFundamentalQuery { Code = code, ThrowNotFoundIfNull = false }) 
                ?? new StockFundamental { };

            stockfundamental.StockCode = model.Code;

            _dispatcher.Dispatch(new AddUpdateStockFundamentalCommand { StockFundamental = stockfundamental });

            model = _mapper.Map<StockFundamentalModel>(stockfundamental);

            return Ok(model);
        }

        [HttpDelete("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(string code)
        {
            var stockfundamental = _dispatcher.Dispatch(new GetStockFundamentalQuery { Code = code, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteStockFundamentalCommand { StockFundamental = stockfundamental });

            return Ok();
        }

        [HttpGet("{id}/auditlogs")]
        public ActionResult<IEnumerable<AuditLogEntryDTO>> GetAuditLogs(Guid id)
        {
            var logs = _dispatcher.Dispatch(new GetAuditEntriesQuery { ObjectId = id.ToString() });

            List<dynamic> entries = new List<dynamic>();
            StockFundamentalDTO previous = null;
            foreach (var log in logs.OrderBy(x => x.CreatedDateTime))
            {
                var data = JsonConvert.DeserializeObject<StockFundamentalDTO>(log.Log);
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