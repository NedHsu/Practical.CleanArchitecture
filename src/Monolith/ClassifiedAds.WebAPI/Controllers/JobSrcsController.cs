using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.JobSrcs.Commands;
using ClassifiedAds.Application.JobSrcs.DTOs;
using ClassifiedAds.Application.JobSrcs.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.JobSrcs;
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
    public class JobSrcsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public JobSrcsController(Dispatcher dispatcher, ILogger<JobSrcsController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<JobSrcModel>> Get([FromQuery] GetJobSrcsQuery query)
        {
            _logger.LogInformation("Getting all jobSrcs");
            var jobSrcs = _dispatcher.Dispatch(query);
            var model = _mapper.Map<IEnumerable<JobSrcModel>>(jobSrcs);
            return Ok(model);
        }

        [HttpGet("{provider}/{name}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<JobSrcModel> Get(string provider, string name)
        {
            var jobSrc = _dispatcher.Dispatch(new GetJobSrcQuery { Provider = provider, Name = name, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<JobSrcModel>(jobSrc);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<JobSrc> Post([FromBody] JobSrcModel model)
        {
            var jobSrc = _mapper.Map<JobSrc>(model);
            _dispatcher.Dispatch(new AddUpdateJobSrcCommand { JobSrc = jobSrc });
            model = _mapper.Map<JobSrcModel>(jobSrc);
            return Created($"/api/jobSrcs", model);
        }

        [HttpPut]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put([FromBody] JobSrcModel model)
        {
            var jobSrc = _dispatcher.Dispatch(new GetJobSrcQuery { Provider = model.Provider, Name = model.Name, ThrowNotFoundIfNull = false })
                ?? new JobSrc { };

            jobSrc.Name = model.Name;

            _dispatcher.Dispatch(new AddUpdateJobSrcCommand { JobSrc = jobSrc });

            model = _mapper.Map<JobSrcModel>(jobSrc);

            return Ok(model);
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete([FromQuery] GetJobSrcQuery query)
        {
            query.ThrowNotFoundIfNull = true;
            var jobSrc = _dispatcher.Dispatch(query);

            _dispatcher.Dispatch(new DeleteJobSrcCommand { JobSrc = jobSrc });

            return Ok();
        }
    }
}