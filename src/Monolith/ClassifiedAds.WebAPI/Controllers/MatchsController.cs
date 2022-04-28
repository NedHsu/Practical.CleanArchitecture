using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.AuditLogEntries.DTOs;
using ClassifiedAds.Application.AuditLogEntries.Queries;
using ClassifiedAds.Application.Matchs.Commands;
using ClassifiedAds.Application.Matchs.DTOs;
using ClassifiedAds.Application.Matchs.Queries;
using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.Matchs;
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
    public class MatchsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public MatchsController(Dispatcher dispatcher, ILogger<MatchsController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Match>> Get()
        {
            _logger.LogInformation("Getting all matchs");
            var matchs = _dispatcher.Dispatch(new GetMatchsQuery());
            var model = matchs.ToDTOs();
            return Ok(model);
        }

        [HttpPost("paged")]
        public ActionResult<PagedResult<Match>> PostPaged(MatchFilterModel filter)
        {
            _logger.LogInformation("Getting paged match");
            var result = _dispatcher.Dispatch(new GetMatchPagedQuery()
            {
                PageIndex = filter.Pager.PageIndex,
                PageSize = filter.Pager.PageSize,
            });
            return Ok(result.ToDTO());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Match> Get(Guid id)
        {
            var match = _dispatcher.Dispatch(new GetMatchQuery { Id = id, ThrowNotFoundIfNull = true });
            var model = match.ToDTO();
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<Match> Post([FromBody] MatchModel model)
        {
            var match = model.ToEntity();
            match.CreaterId = User.GetUserId();
            _dispatcher.Dispatch(new AddUpdateMatchCommand { Match = match });
            model = match.ToDTO();
            return Created($"/api/matchs/{model.Id}", model);
        }

        [HttpPut("{id}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(Guid id, [FromBody] MatchModel model)
        {
            var match = _dispatcher.Dispatch(new GetMatchQuery { Id = id, ThrowNotFoundIfNull = true });

            match.Name = model.Name;
            match.Description = model.Description;

            _dispatcher.Dispatch(new AddUpdateMatchCommand { Match = match });

            model = match.ToDTO();

            return Ok(model);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(Guid id)
        {
            var match = _dispatcher.Dispatch(new GetMatchQuery { Id = id, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteMatchCommand { Match = match });

            return Ok();
        }

        [HttpGet("{id}/auditlogs")]
        public ActionResult<IEnumerable<AuditLogEntryDTO>> GetAuditLogs(Guid id)
        {
            var logs = _dispatcher.Dispatch(new GetAuditEntriesQuery { ObjectId = id.ToString() });

            List<dynamic> entries = new List<dynamic>();
            MatchDTO previous = null;
            foreach (var log in logs.OrderBy(x => x.CreatedDateTime))
            {
                var data = JsonConvert.DeserializeObject<MatchDTO>(log.Log);
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