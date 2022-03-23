using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.StockEPSs.Commands;
using ClassifiedAds.Application.StockEPSs.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.StockEPSs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace ClassifiedAds.WebAPI.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class StockEPSController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public StockEPSController(Dispatcher dispatcher, ILogger<StockEPSController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<StockEPSModel> Get(string code, int year)
        {
            var stockEPS = _dispatcher.Dispatch(new GetStockEPSQuery { Code = code, Year = year, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<StockEPSModel>(stockEPS);
            return Ok(model);
        }

        [HttpGet]
        public ActionResult<IEnumerable<StockEPSModel>> Get([FromQuery] GetStockEPSQuery query)
        {
            _logger.LogInformation("Getting all stockEPS");
            var stockEPS = _dispatcher.Dispatch(query);
            var model = _mapper.Map<IEnumerable<StockEPSModel>>(stockEPS);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<StockEPS> Post([FromBody] StockEPSModel model)
        {
            var stockEPS = _mapper.Map<StockEPS>(model);
            _dispatcher.Dispatch(new AddUpdateStockEPSCommand { StockEPS = stockEPS });
            model = _mapper.Map<StockEPSModel>(stockEPS);
            return Created($"/api/stockEPS/{model.Code}", model);
        }

        [HttpPut]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put([FromBody] StockEPSModel model)
        {
            var stockEPS = _dispatcher.Dispatch(new GetStockEPSQuery { Code = model.Code, Year = model.Year, ThrowNotFoundIfNull = false })
                ?? _mapper.Map<StockEPS>(model);

            stockEPS.EPS = model.EPS;

            _dispatcher.Dispatch(new AddUpdateStockEPSCommand { StockEPS = stockEPS });

            model = _mapper.Map<StockEPSModel>(stockEPS);

            return Ok(model);
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete([FromQuery] GetStockEPSQuery query)
        {
            query.ThrowNotFoundIfNull = true;
            var stockEPS = _dispatcher.Dispatch(query);

            _dispatcher.Dispatch(new DeleteStockEPSCommand { StockEPS = stockEPS });

            return Ok();
        }
    }
}