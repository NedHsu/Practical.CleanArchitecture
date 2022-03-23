using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.StockNews.Commands;
using ClassifiedAds.Application.StockNews.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.StockNews;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.WebAPI.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class StockNewsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public StockNewsController(Dispatcher dispatcher, ILogger<StockNewsController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<StockNewModel>> Get()
        {
            _logger.LogInformation("Getting all stockNews");
            var stockNews = _dispatcher.Dispatch(new GetStockNewsQuery() { });
            var model = _mapper.Map<IEnumerable<StockNewModel>>(stockNews);
            return Ok(model);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<StockNewModel> Get(Guid id)
        {
            var stockNew = _dispatcher.Dispatch(new GetStockNewQuery { Id = id, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<StockNewModel>(stockNew);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<StockNew> Post([FromBody] StockNewModel model)
        {
            var stockNew = _mapper.Map<StockNew>(model);
            _dispatcher.Dispatch(new AddUpdateStockNewCommand { StockNew = stockNew });
            model = _mapper.Map<StockNewModel>(stockNew);
            return Created($"/api/stockNews/{model.Id}", model);
        }

        [HttpPut("{id}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(Guid id, [FromBody] StockNewModel model)
        {
            var stockNew = _dispatcher.Dispatch(new GetStockNewQuery { Id = id, ThrowNotFoundIfNull = false })
                ?? new StockNew { };

            stockNew.Title = model.Name;

            _dispatcher.Dispatch(new AddUpdateStockNewCommand { StockNew = stockNew });

            model = _mapper.Map<StockNewModel>(stockNew);

            return Ok(model);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(Guid id)
        {
            var stockNew = _dispatcher.Dispatch(new GetStockNewQuery { Id = id, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteStockNewCommand { StockNew = stockNew });

            return Ok();
        }
    }
}