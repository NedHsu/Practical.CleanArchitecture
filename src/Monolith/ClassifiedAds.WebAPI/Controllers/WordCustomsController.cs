using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.WordCustoms.Commands;
using ClassifiedAds.Application.WordCustoms.Queries;
using ClassifiedAds.Application.Words.Queries;
using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.WordCustoms;
using ClassifiedAds.WebAPI.Models.Words;
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
    public class WordCustomsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public WordCustomsController(Dispatcher dispatcher, ILogger<WordCustomsController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WordCustomModel>>> Get()
        {
            _logger.LogInformation("Getting all wordCustoms");
            var wordCustoms = await _dispatcher.DispatchAsync(new GetWordCustomsQuery() { });
            var model = _mapper.Map<IEnumerable<WordCustomModel>>(wordCustoms);
            return Ok(model);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<WordCustomModel>> Get(Guid id)
        {
            var wordCustom = await _dispatcher.DispatchAsync(new GetWordCustomQuery { Id = id, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<WordCustomModel>(wordCustom);
            return Ok(model);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Put([FromBody] WordCustomModel model)
        {
            var userId = User.GetUserId();
            WordCustom wordCustom = (model.Id.HasValue ? await _dispatcher.DispatchAsync(new GetWordCustomQuery { Id = model.Id.Value, ThrowNotFoundIfNull = false })
                : new WordCustom(userId)) ?? new WordCustom(userId);
            if (wordCustom.UserId != userId)
            {
                return BadRequest("not allowed");
            }

            wordCustom.Text = model.Text;
            wordCustom.WordId = model.WordId;
            wordCustom.Description = model.Description;
            wordCustom.PartOfSpeach = model.PartOfSpeach;

            await _dispatcher.DispatchAsync(new AddUpdateWordCustomCommand { WordCustom = wordCustom });

            model = _mapper.Map<WordCustomModel>(wordCustom);

            return Ok(model);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(Guid id)
        {
            var wordCustom = await _dispatcher.DispatchAsync(new GetWordCustomQuery { Id = id, ThrowNotFoundIfNull = true });
            if (wordCustom.UserId != User.GetUserId())
            {
                return BadRequest("not allowed");
            }

            await _dispatcher.DispatchAsync(new DeleteWordCustomCommand { WordCustom = wordCustom });
            var word = await _dispatcher.DispatchAsync(new GetWordQuery { Id = wordCustom.WordId.Value });

            return Ok(_mapper.Map<WordModel>(word));
        }
    }
}