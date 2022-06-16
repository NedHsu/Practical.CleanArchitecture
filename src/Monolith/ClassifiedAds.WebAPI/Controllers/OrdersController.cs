using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.Orders.Commands;
using ClassifiedAds.Application.Orders.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClassifiedAds.WebAPI.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public OrdersController(Dispatcher dispatcher, ILogger<OrdersController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderModel>>> Get()
        {
            _logger.LogInformation("Getting all orders");
            var orders = await _dispatcher.DispatchAsync(new GetOrdersQuery() { });
            var model = _mapper.Map<IEnumerable<OrderModel>>(orders);
            return Ok(model);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<OrderModel>> Get(Guid id)
        {
            var order = await _dispatcher.DispatchAsync(new GetOrderQuery { Id = id, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<OrderModel>(order);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Order>> Post([FromBody] OrderModel model)
        {
            var order = _mapper.Map<Order>(model);
            await _dispatcher.DispatchAsync(new AddUpdateOrderCommand { Order = order });
            model = _mapper.Map<OrderModel>(order);
            return Created($"/api/orders/{model.Id}", model);
        }

        [HttpPut("{id}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Put(Guid id, [FromBody] OrderModel model)
        {
            var order = await _dispatcher.DispatchAsync(new GetOrderQuery { Id = id, ThrowNotFoundIfNull = false })
                ?? new Order { };

            await _dispatcher.DispatchAsync(new AddUpdateOrderCommand { Order = order });

            model = _mapper.Map<OrderModel>(order);

            return Ok(model);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(Guid id)
        {
            var order = await _dispatcher.DispatchAsync(new GetOrderQuery { Id = id, ThrowNotFoundIfNull = true });

            await _dispatcher.DispatchAsync(new DeleteOrderCommand { Order = order });

            return Ok();
        }
    }
}