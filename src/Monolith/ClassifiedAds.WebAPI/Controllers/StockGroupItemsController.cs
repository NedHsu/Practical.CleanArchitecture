using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.AuditLogEntries.DTOs;
using ClassifiedAds.Application.AuditLogEntries.Queries;
using ClassifiedAds.Application.StockGroupItems.Commands;
using ClassifiedAds.Application.StockGroupItems.DTOs;
using ClassifiedAds.Application.StockGroupItems.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.StockGroupItems;
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
    public class StockGroupItemsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public StockGroupItemsController(Dispatcher dispatcher, ILogger<StockGroupItemsController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("code/{code}")]
        public ActionResult<IEnumerable<StockGroupItemModel>> Get(string code)
        {
            _logger.LogInformation("Getting all StockGroupItems");
            var stockGroupItems = _dispatcher.Dispatch(new GetStockGroupItemsQuery(){ Code = code });
            var model = _mapper.Map<IEnumerable<StockGroupItemModel>>(stockGroupItems);
            return Ok(model);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<StockGroupItemModel> Get(Guid id)
        {
            var stockGroupItem = _dispatcher.Dispatch(new GetStockGroupItemQuery { Id = id, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<StockGroupItemModel>(stockGroupItem);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<StockGroupItem> Post([FromBody] StockGroupItemModel model)
        {
            var stockGroupItem = _mapper.Map<StockGroupItem>(model);
            _dispatcher.Dispatch(new AddUpdateStockGroupItemCommand { StockGroupItem = stockGroupItem });
            model = _mapper.Map<StockGroupItemModel>(stockGroupItem);
            return Created($"/api/StockGroupItems/{model.Id}", model);
        }

        [HttpPut("stocks")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult PutStocks(UpdateStockGroupItemStocksCommand command)
        {
            _dispatcher.Dispatch(command);

            return Ok();
        }

        [HttpPut("stocks/add")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult PostStocks(AddStockGroupItemStocksCommand command)
        {
            _dispatcher.Dispatch(command);

            return Ok();
        }

        [HttpPut("{stockCode}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(string stockCode, [FromBody] List<Guid> groupIds)
        {
            _dispatcher.Dispatch(new UpdateStockGroupItemsCommand { StockCode = stockCode, StockGroupIds = groupIds });

            return Ok();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(Guid id)
        {
            var stockGroupItem = _dispatcher.Dispatch(new GetStockGroupItemQuery { Id = id, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteStockGroupItemCommand { StockGroupItem = stockGroupItem });

            return Ok();
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete([FromQuery] StockGroupItem item)
        {
            var stockGroupItem = _dispatcher.Dispatch(new GetStockGroupItemExQuery { StockCode = item.StockCode, GroupId = item.GroupId, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteStockGroupItemCommand { StockGroupItem = stockGroupItem });

            return Ok(stockGroupItem);
        }

        [HttpGet("{id}/auditlogs")]
        public ActionResult<IEnumerable<AuditLogEntryDTO>> GetAuditLogs(Guid id)
        {
            var logs = _dispatcher.Dispatch(new GetAuditEntriesQuery { ObjectId = id.ToString() });

            List<dynamic> entries = new List<dynamic>();
            StockGroupItemDTO previous = null;
            foreach (var log in logs.OrderBy(x => x.CreatedDateTime))
            {
                var data = JsonConvert.DeserializeObject<StockGroupItemDTO>(log.Log);
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