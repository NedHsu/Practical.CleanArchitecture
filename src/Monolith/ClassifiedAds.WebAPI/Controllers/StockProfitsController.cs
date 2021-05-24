using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.AuditLogEntries.DTOs;
using ClassifiedAds.Application.AuditLogEntries.Queries;
using ClassifiedAds.Application.StockProfits.Commands;
using ClassifiedAds.Application.StockProfits.DTOs;
using ClassifiedAds.Application.StockProfits.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.StockProfits;
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
    public class StockProfitsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public StockProfitsController(Dispatcher dispatcher, ILogger<StockProfitsController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<StockProfitModel>> Get([FromQuery]GetStockProfitsQuery query)
        {
            _logger.LogInformation("Getting all stockprofits");
            var stockprofits = _dispatcher.Dispatch(query);
            var model = _mapper.Map<IEnumerable<StockProfitModel>>(stockprofits);
            return Ok(model);
        }

        [HttpGet("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<StockProfitModel> Get(string code)
        {
            var stockprofit = _dispatcher.Dispatch(new GetStockProfitQuery { Code = code, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<StockProfitModel>(stockprofit);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<StockProfit> Post([FromBody] StockProfitModel model)
        {
            var stockprofit = _mapper.Map<StockProfit>(model);
            _dispatcher.Dispatch(new AddUpdateStockProfitCommand { StockProfit = stockprofit });
            model = _mapper.Map<StockProfitModel>(stockprofit);
            return Created($"/api/stockprofits/{model.Code}", model);
        }

        [HttpPut("{code}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(string code, [FromBody] StockProfitModel model)
        {
            var stockprofit = _dispatcher.Dispatch(new GetStockProfitQuery { Code = code, ThrowNotFoundIfNull = false }) 
                ?? new StockProfit { };

            stockprofit.StockCode = model.Code;

            _dispatcher.Dispatch(new AddUpdateStockProfitCommand { StockProfit = stockprofit });

            model = _mapper.Map<StockProfitModel>(stockprofit);

            return Ok(model);
        }

        [HttpDelete("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(string code)
        {
            var stockprofit = _dispatcher.Dispatch(new GetStockProfitQuery { Code = code, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteStockProfitCommand { StockProfit = stockprofit });

            return Ok();
        }

        [HttpGet("{id}/auditlogs")]
        public ActionResult<IEnumerable<AuditLogEntryDTO>> GetAuditLogs(Guid id)
        {
            var logs = _dispatcher.Dispatch(new GetAuditEntriesQuery { ObjectId = id.ToString() });

            List<dynamic> entries = new List<dynamic>();
            StockProfitDTO previous = null;
            foreach (var log in logs.OrderBy(x => x.CreatedDateTime))
            {
                var data = JsonConvert.DeserializeObject<StockProfitDTO>(log.Log);
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