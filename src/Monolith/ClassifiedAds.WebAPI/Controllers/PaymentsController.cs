using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Domain.Infrastructure.Payment;
using ClassifiedAds.WebAPI.Models.Payments;
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
        public async Task<ActionResult<IEnumerable<PaymentModel>>> Get()
        {
            var payments = _paymentManager.Action(new PaymentActionParameters { });
            var model = _mapper.Map<IEnumerable<PaymentModel>>(payments);
            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<PaymentModel>>> Post(CheckOutParameters paras)
        {
            return Ok(_paymentManager.CheckOut(paras));
        }
    }
}