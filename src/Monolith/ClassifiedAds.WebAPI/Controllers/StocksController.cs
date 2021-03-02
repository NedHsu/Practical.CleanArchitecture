using ClassifiedAds.Application;
using ClassifiedAds.Application.AuditLogEntries.DTOs;
using ClassifiedAds.Application.AuditLogEntries.Queries;
using ClassifiedAds.Application.Stocks.Commands;
using ClassifiedAds.Application.Stocks.DTOs;
using ClassifiedAds.Application.Stocks.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.Stocks;
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
    public class StocksController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;

        public StocksController(Dispatcher dispatcher, ILogger<StocksController> logger)
        {
            _dispatcher = dispatcher;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<stock>> Get()
        {
            _logger.LogInformation("Getting all stocks");
            var stocks = _dispatcher.Dispatch(new GetStocksQuery());
            var model = stocks.ToDTOs();
            return Ok(model);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<stock> Get(string code)
        {
            var stock = _dispatcher.Dispatch(new GetStockQuery { Code = code, ThrowNotFoundIfNull = true });
            var model = stock.ToDTO();
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<stock> Post([FromBody] StockModel model)
        {
            var stock = model.ToEntity();
            _dispatcher.Dispatch(new AddUpdateStockCommand { Stock = stock });
            model = stock.ToDTO();
            return Created($"/api/stocks/{model.Id}", model);
        }

        [HttpPut("{id}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(string code, [FromBody] StockModel model)
        {
            var stock = _dispatcher.Dispatch(new GetStockQuery { Code = code, ThrowNotFoundIfNull = true });

            stock.code = model.Code;
            stock.name = model.Name;

            _dispatcher.Dispatch(new AddUpdateStockCommand { Stock = stock });

            model = stock.ToDTO();

            return Ok(model);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(string code)
        {
            var stock = _dispatcher.Dispatch(new GetStockQuery { Code = code, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteStockCommand { Stock = stock });

            return Ok();
        }

        [HttpGet("{id}/auditlogs")]
        public ActionResult<IEnumerable<AuditLogEntryDTO>> GetAuditLogs(Guid id)
        {
            var logs = _dispatcher.Dispatch(new GetAuditEntriesQuery { ObjectId = id.ToString() });

            List<dynamic> entries = new List<dynamic>();
            StockDTO previous = null;
            foreach (var log in logs.OrderBy(x => x.CreatedDateTime))
            {
                var data = JsonConvert.DeserializeObject<StockDTO>(log.Log);
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