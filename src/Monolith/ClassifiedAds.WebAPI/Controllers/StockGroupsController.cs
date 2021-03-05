using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.AuditLogEntries.DTOs;
using ClassifiedAds.Application.AuditLogEntries.Queries;
using ClassifiedAds.Application.StockGroups.Commands;
using ClassifiedAds.Application.StockGroups.DTOs;
using ClassifiedAds.Application.StockGroups.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.StockGroups;
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
    public class StockGroupsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public StockGroupsController(Dispatcher dispatcher, ILogger<StockGroupsController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<StockGroupModel>> Get()
        {
            _logger.LogInformation("Getting all stockgroups");
            var stockgroups = _dispatcher.Dispatch(new GetStockGroupsQuery(){ });
            var model = _mapper.Map<IEnumerable<StockGroupModel>>(stockgroups);
            return Ok(model);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<StockGroupModel> Get(Guid id)
        {
            var stockgroup = _dispatcher.Dispatch(new GetStockGroupQuery { Id = id, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<StockGroupModel>(stockgroup);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<StockGroup> Post([FromBody] StockGroupModel model)
        {
            var stockgroup = _mapper.Map<StockGroup>(model);
            _dispatcher.Dispatch(new AddUpdateStockGroupCommand { StockGroup = stockgroup });
            model = _mapper.Map<StockGroupModel>(stockgroup);
            return Created($"/api/stockgroups/{model.Title}", model);
        }

        [HttpPut("{id}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(Guid id, [FromBody] StockGroupModel model)
        {
            var stockgroup = _dispatcher.Dispatch(new GetStockGroupQuery { Id = id, ThrowNotFoundIfNull = false }) 
                ?? new StockGroup { };

            stockgroup.GroupTitle = model.Title;
            stockgroup.Sort = model.Sort;

            _dispatcher.Dispatch(new AddUpdateStockGroupCommand { StockGroup = stockgroup });

            model = _mapper.Map<StockGroupModel>(stockgroup);

            return Ok(model);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(Guid id)
        {
            var stockgroup = _dispatcher.Dispatch(new GetStockGroupQuery { Id = id, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteStockGroupCommand { StockGroup = stockgroup });

            return Ok();
        }

        [HttpGet("{id}/auditlogs")]
        public ActionResult<IEnumerable<AuditLogEntryDTO>> GetAuditLogs(Guid id)
        {
            var logs = _dispatcher.Dispatch(new GetAuditEntriesQuery { ObjectId = id.ToString() });

            List<dynamic> entries = new List<dynamic>();
            StockGroupDTO previous = null;
            foreach (var log in logs.OrderBy(x => x.CreatedDateTime))
            {
                var data = JsonConvert.DeserializeObject<StockGroupDTO>(log.Log);
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