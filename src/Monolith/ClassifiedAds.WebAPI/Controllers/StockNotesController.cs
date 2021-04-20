using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.AuditLogEntries.DTOs;
using ClassifiedAds.Application.AuditLogEntries.Queries;
using ClassifiedAds.Application.StockNotes.Commands;
using ClassifiedAds.Application.StockNotes.DTOs;
using ClassifiedAds.Application.StockNotes.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.Common;
using ClassifiedAds.WebAPI.Models.StockNotes;
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
    public class StockNotesController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public StockNotesController(Dispatcher dispatcher, ILogger<StockNotesController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<StockNoteModel>> Get(string code)
        {
            _logger.LogInformation("Getting all stocknotes");
            var stocknotes = _dispatcher.Dispatch(new GetStockNotesQuery(){ Code = code });
            var model = _mapper.Map<IEnumerable<StockNoteModel>>(stocknotes);
            return Ok(model);
        }

        [HttpGet("paged")]
        public ActionResult<PagedResultModel<StockNoteModel>> GetPaged(uint pageIndex, uint pageSize)
        {
            _logger.LogInformation("Getting paged stocknotes");
            var stocknotes = _dispatcher.Dispatch(new GetStockNotePagedQuery() { PageIndex = pageIndex, PageSize = pageSize });
            var model = _mapper.Map<PagedResultModel<StockNoteModel>>(stocknotes);
            return Ok(model);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<StockNote> Get(Guid id)
        {
            var stocknote = _dispatcher.Dispatch(new GetStockNoteQuery { Id = id, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<StockNote>(stocknote);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<StockNote> Post([FromBody] StockNoteModel model)
        {
            var stocknote = _mapper.Map<StockNote>(model);
            stocknote.Id = Guid.NewGuid();
            stocknote.Created = DateTime.Now;
            _dispatcher.Dispatch(new AddUpdateStockNoteCommand { StockNote = stocknote });
            model = _mapper.Map<StockNoteModel>(stocknote);
            return Created($"/api/stocknotes/{model.Id}", model);
        }

        [HttpPut("{id}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(Guid id, [FromBody] StockNoteModel model)
        {
            var stocknote = _dispatcher.Dispatch(new GetStockNoteQuery { Id = id, ThrowNotFoundIfNull = true });

            stocknote.Title = model.Title;
            stocknote.Contents = model.Contents;
            stocknote.Updated = DateTime.Now;
            _dispatcher.Dispatch(new AddUpdateStockNoteCommand { StockNote = stocknote });

            model = _mapper.Map<StockNoteModel>(stocknote);

            return Ok(model);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(Guid id)
        {
            var stocknote = _dispatcher.Dispatch(new GetStockNoteQuery { Id = id, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteStockNoteCommand { StockNote = stocknote });

            return Ok();
        }

        [HttpGet("{id}/auditlogs")]
        public ActionResult<IEnumerable<AuditLogEntryDTO>> GetAuditLogs(Guid id)
        {
            var logs = _dispatcher.Dispatch(new GetAuditEntriesQuery { ObjectId = id.ToString() });

            List<dynamic> entries = new List<dynamic>();
            StockNoteDTO previous = null;
            foreach (var log in logs.OrderBy(x => x.CreatedDateTime))
            {
                var data = JsonConvert.DeserializeObject<StockNoteDTO>(log.Log);
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