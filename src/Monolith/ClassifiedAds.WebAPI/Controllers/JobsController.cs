using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.Jobs.Commands;
using ClassifiedAds.Application.Jobs.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Hubs;
using ClassifiedAds.WebAPI.Models.Jobs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.WebAPI.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private readonly IHubContext<JobHub> _hub;

        public JobsController(Dispatcher dispatcher, ILogger<JobsController> logger, IMapper mapper, IHubContext<JobHub> hub)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
            _hub = hub;
        }

        [HttpGet]
        public ActionResult<IEnumerable<JobModel>> Get([FromQuery] GetJobsQuery query)
        {
            _logger.LogInformation("Getting all jobs");
            var jobs = _dispatcher.Dispatch(query);
            var model = _mapper.Map<IEnumerable<JobModel>>(jobs);
            return Ok(model);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<JobModel> Get(int id)
        {
            var job = _dispatcher.Dispatch(new GetJobQuery { Id = id, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<JobModel>(job);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<Job> Post([FromBody] JobModel model)
        {
            var job = _mapper.Map<Job>(model);
            job.CreatedAt = DateTime.Now;
            _dispatcher.Dispatch(new AddUpdateJobCommand { Job = job });
            model = _mapper.Map<JobModel>(job);
            return Created($"/api/jobs/{model.Id}", model);
        }

        [HttpPut("{id}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(int id, [FromBody] JobModel model)
        {
            var job = _dispatcher.Dispatch(new GetJobQuery { Id = id, ThrowNotFoundIfNull = false })
                ?? new Job { };

            job.Name = model.Name;

            _dispatcher.Dispatch(new AddUpdateJobCommand { Job = job });

            model = _mapper.Map<JobModel>(job);

            return Ok(model);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(int id)
        {
            var job = _dispatcher.Dispatch(new GetJobQuery { Id = id, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteJobCommand { Job = job });

            return Ok();
        }
    }
}