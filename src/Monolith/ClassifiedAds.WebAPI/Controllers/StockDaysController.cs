using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.AuditLogEntries.DTOs;
using ClassifiedAds.Application.AuditLogEntries.Queries;
using ClassifiedAds.Application.StockDays.Commands;
using ClassifiedAds.Application.StockDays.DTOs;
using ClassifiedAds.Application.StockDays.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.StockDays;
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
    public class StockDaysController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public StockDaysController(Dispatcher dispatcher, ILogger<StockDaysController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<StockDayModel>> Get(string code, DateTime startDate, DateTime endDate)
        {
            var stockday = _dispatcher.Dispatch(new GetStockDaysQuery { StockCode = code, StartDate = startDate, EndDate = endDate });
            var model = _mapper.Map<IEnumerable<StockDayModel>>(stockday);
            return Ok(model);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Dictionary<string, List<StockDayModel>>> Get(GetStocksDaysQuery query)
        {
            var stockday = _dispatcher.Dispatch(query);
            var model = _mapper.Map<Dictionary<string, List<StockDayModel>>>(stockday.GroupBy(x => x.StockCode).ToDictionary(x => x.Key, x => x.ToList()));
            return Ok(model);
        }
    }
}