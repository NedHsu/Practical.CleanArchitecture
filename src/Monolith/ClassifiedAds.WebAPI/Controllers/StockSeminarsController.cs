using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.AuditLogEntries.DTOs;
using ClassifiedAds.Application.AuditLogEntries.Queries;
using ClassifiedAds.Application.StockSeminars.Commands;
using ClassifiedAds.Application.StockSeminars.DTOs;
using ClassifiedAds.Application.StockSeminars.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.Common;
using ClassifiedAds.WebAPI.Models.StockSeminars;
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
    public class StockSeminarsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public StockSeminarsController(Dispatcher dispatcher, ILogger<StockSeminarsController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<PagedResultModel<StockSeminarModel>> Get([FromQuery]GetStockSeminarsQuery query)
        {
            _logger.LogInformation("Getting all stockseminars");
            var stockseminars = _dispatcher.Dispatch(query);
            var model = _mapper.Map<PagedResultModel<StockSeminarModel>>(stockseminars);
            return Ok(model);
        }

        [HttpGet("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<StockSeminarModel> Get(string code)
        {
            var stockseminar = _dispatcher.Dispatch(new GetStockSeminarQuery { StockCode = code, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<StockSeminarModel>(stockseminar);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<StockSeminar> Post([FromBody] StockSeminarModel model)
        {
            var stockseminar = _mapper.Map<StockSeminar>(model);
            _dispatcher.Dispatch(new AddUpdateStockSeminarCommand { StockSeminar = stockseminar });
            model = _mapper.Map<StockSeminarModel>(stockseminar);
            return Created($"/api/stockseminars/{model.StockCode}", model);
        }

        [HttpPut("{code}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(string code, [FromBody] StockSeminarModel model)
        {
            var stockseminar = _dispatcher.Dispatch(new GetStockSeminarQuery { StockCode = code, ThrowNotFoundIfNull = false })
                ?? new StockSeminar { };

            stockseminar.StockCode = model.StockCode;

            _dispatcher.Dispatch(new AddUpdateStockSeminarCommand { StockSeminar = stockseminar });

            model = _mapper.Map<StockSeminarModel>(stockseminar);

            return Ok(model);
        }

        [HttpDelete("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(string code)
        {
            var stockseminar = _dispatcher.Dispatch(new GetStockSeminarQuery { StockCode = code, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteStockSeminarCommand { StockSeminar = stockseminar });

            return Ok();
        }

        [HttpGet("{id}/auditlogs")]
        public ActionResult<IEnumerable<AuditLogEntryDTO>> GetAuditLogs(Guid id)
        {
            var logs = _dispatcher.Dispatch(new GetAuditEntriesQuery { ObjectId = id.ToString() });

            List<dynamic> entries = new List<dynamic>();
            StockSeminarDTO previous = null;
            foreach (var log in logs.OrderBy(x => x.CreatedDateTime))
            {
                var data = JsonConvert.DeserializeObject<StockSeminarDTO>(log.Log);
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