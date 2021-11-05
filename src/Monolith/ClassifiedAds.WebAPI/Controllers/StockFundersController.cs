using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.StockFunders.Queries;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.StockFunders;
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
    public class StockFundersController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public StockFundersController(Dispatcher dispatcher, ILogger<StockFundersController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<StockFunderModel>> Get()
        {
            _logger.LogInformation("Getting all stockFunders");
            var stockFunders = _dispatcher.Dispatch(new GetStockFundersQuery() { });
            var model = _mapper.Map<IEnumerable<StockFunderModel>>(stockFunders);
            return Ok(model);
        }

        [HttpGet("score")]
        public ActionResult<IEnumerable<StockFunderScoreDTO>> Get([FromQuery] GetStockFunderScoreQuery query)
        {
            _logger.LogInformation("Getting stock funder Score");
            var stockFunders = _dispatcher.Dispatch(query);
            var model = _mapper.Map<IEnumerable<StockFunderScoreDTO>>(stockFunders);
            return Ok(model);
        }

        [HttpGet("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<StockFunderModel> Get(string code, DateTime startDate, DateTime endDate)
        {
            var stockFunder = _dispatcher.Dispatch(new GetStockFundersQuery { StockCode = code, StartDate = startDate, EndDate = endDate });
            var model = _mapper.Map<StockFunderDayModel>(stockFunder);
            return Ok(model);
        }
    }
}