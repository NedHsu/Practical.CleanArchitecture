using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.AuditLogEntries.DTOs;
using ClassifiedAds.Application.AuditLogEntries.Queries;
using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.Weathers;
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
    public class WeathersController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public WeathersController(Dispatcher dispatcher, ILogger<WeathersController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpPost("Tidal")]
        public ActionResult<List<TidalLocation>> GetTidal(GetWeatherTidalQuery query)
        {
            _logger.LogInformation("Getting all Tidal");
            var weathers = _dispatcher.Dispatch(query);
            return Ok(weathers.Records.Location);
        }

        [HttpPost("Recent")]
        public ActionResult<RecentResponse> GetRecent(GetWeatherRecentQuery query)
        {
            _logger.LogInformation("Getting all Recent");
            var weathers = _dispatcher.Dispatch(query);
            return Ok(weathers);
        }

        [HttpPost("Alarm")]
        public ActionResult<AlarmResponse> GetAlarm(GetWeatherAlarmQuery query)
        {
            _logger.LogInformation("Getting all Alarm");
            var weathers = _dispatcher.Dispatch(query);
            return Ok(weathers);
        }

        [HttpPost("Earthquake")]
        public ActionResult<List<Earthquake>> GetEarthquake(GetWeatherEarthquakeQuery query)
        {
            _logger.LogInformation("Getting all Earthquake");
            var weathers = _dispatcher.Dispatch(query);
            return Ok(weathers.Records.Earthquake);
        }

        [HttpPost("County")]
        public ActionResult<CountyResponse> GetCounty(GetWeatherCountyWeatherQuery query)
        {
            _logger.LogInformation("Getting all County");
            var weathers = _dispatcher.Dispatch(query);
            return Ok(weathers);
        }

        [HttpPost("Observation")]
        public ActionResult<List<ObservationLocationModel>> GetCounty(GetWeatherObservationQuery query)
        {
            _logger.LogInformation("Getting all Observation");
            var weathers = _dispatcher.Dispatch(query);
            return Ok(_mapper.Map<List<ObservationLocationModel>>(weathers.Records.Location));
        }
    }
}