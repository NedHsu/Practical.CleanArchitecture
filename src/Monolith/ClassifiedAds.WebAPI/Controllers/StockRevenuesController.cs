using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.AuditLogEntries.DTOs;
using ClassifiedAds.Application.AuditLogEntries.Queries;
using ClassifiedAds.Application.StockRevenues.Commands;
using ClassifiedAds.Application.StockRevenues.DTOs;
using ClassifiedAds.Application.StockRevenues.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.StockRevenues;
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
    public class StockRevenuesController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public StockRevenuesController(Dispatcher dispatcher, ILogger<StockRevenuesController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<StockRevenueModel>> Get([FromQuery]GetStockRevenuesQuery query)
        {
            _logger.LogInformation("Getting all stockrevenues");
            var stockrevenues = _dispatcher.Dispatch(query);
            var model = _mapper.Map<IEnumerable<StockRevenueModel>>(stockrevenues);
            return Ok(model);
        }

        [HttpGet("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<StockRevenueModel> Get(string code)
        {
            var stockrevenue = _dispatcher.Dispatch(new GetStockRevenueQuery { Code = code, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<StockRevenueModel>(stockrevenue);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<StockRevenue> Post([FromBody] StockRevenueModel model)
        {
            var stockrevenue = _mapper.Map<StockRevenue>(model);
            _dispatcher.Dispatch(new AddUpdateStockRevenueCommand { StockRevenue = stockrevenue });
            model = _mapper.Map<StockRevenueModel>(stockrevenue);
            return Created($"/api/stockrevenues/{model.Code}", model);
        }

        [HttpPut("{code}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(string code, [FromBody] StockRevenueModel model)
        {
            var stockrevenue = _dispatcher.Dispatch(new GetStockRevenueQuery { Code = code, ThrowNotFoundIfNull = false }) 
                ?? new StockRevenue { };

            stockrevenue.StockCode = model.Code;

            _dispatcher.Dispatch(new AddUpdateStockRevenueCommand { StockRevenue = stockrevenue });

            model = _mapper.Map<StockRevenueModel>(stockrevenue);

            return Ok(model);
        }

        [HttpDelete("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(string code)
        {
            var stockrevenue = _dispatcher.Dispatch(new GetStockRevenueQuery { Code = code, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteStockRevenueCommand { StockRevenue = stockrevenue });

            return Ok();
        }

        [HttpGet("{id}/auditlogs")]
        public ActionResult<IEnumerable<AuditLogEntryDTO>> GetAuditLogs(Guid id)
        {
            var logs = _dispatcher.Dispatch(new GetAuditEntriesQuery { ObjectId = id.ToString() });

            List<dynamic> entries = new List<dynamic>();
            StockRevenueDTO previous = null;
            foreach (var log in logs.OrderBy(x => x.CreatedDateTime))
            {
                var data = JsonConvert.DeserializeObject<StockRevenueDTO>(log.Log);
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