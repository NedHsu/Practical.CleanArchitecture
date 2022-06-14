using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.Orders.Queries;
using ClassifiedAds.Domain.Infrastructure.Payment;
using ClassifiedAds.WebAPI.Models.Payments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassifiedAds.WebAPI.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private readonly IPaymentManager _paymentManager;

        public PaymentsController(Dispatcher dispatcher, ILogger<PaymentsController> logger, IMapper mapper, IPaymentManager paymentManager)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
            _paymentManager = paymentManager;
        }

        [HttpGet]
        public ActionResult<IEnumerable<PaymentModel>> Get()
        {
            var payments = _paymentManager.Action(new PaymentActionParameters { });
            var model = _mapper.Map<IEnumerable<PaymentModel>>(payments);
            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<PaymentModel>>> Post(PaymentModel vm)
        {
            var order = await _dispatcher.DispatchAsync(new GetOrderQuery
            {
                Id = vm.OrderId,
            });
            return Ok(_paymentManager.CheckOut(new CheckOutParameters
            {
                MerchantTradeDate = DateTime.Now,
                TotalAmount = order.TotalAmount,
                TradeDesc = "",
                MerchantTradeNo = order.Id.ToString(),
                Items = order.Items.Select(x => new PaymentItem
                {
                    Name = x.Product.Name,
                    Price = x.Product.Price,
                    Quantity = x.Quantity,
                    URL = "",
                }),
            }));
        }
    }
}