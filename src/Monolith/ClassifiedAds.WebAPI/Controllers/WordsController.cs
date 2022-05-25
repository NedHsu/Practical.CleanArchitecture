using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.Words.Commands;
using ClassifiedAds.Application.Words.Queries;
using ClassifiedAds.Application.WordStatss.Queries;
using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
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
    public class WordsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public WordsController(Dispatcher dispatcher, ILogger<WordsController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WordModel>>> Get()
        {
            _logger.LogInformation("Getting all words");
            var words = await _dispatcher.DispatchAsync(new GetWordsQuery() { });
            var model = _mapper.Map<IEnumerable<WordModel>>(words);
            return Ok(model);
        }

        [HttpGet("stats/paged")]
        public async Task<ActionResult<PagedResult<WordStatsDTO>>> Get([FromQuery] GetWordStatsPagedQuery quey)
        {
            _logger.LogInformation("Getting paged word stats");
            quey.UserId = User.GetUserId();
            var words = await _dispatcher.DispatchAsync(quey);
            return Ok(words);
        }

        [HttpGet("stats/recent")]
        public async Task<ActionResult<List<WordStatsDTO>>> GetRecent()
        {
            _logger.LogInformation("Getting recent word stats");
            var query = new GetWordStatsRecentQuery()
            {
                UserId = User.GetUserId(),
            };
            var words = await _dispatcher.DispatchAsync(query);
            return Ok(words);
        }

        [HttpPut("stats")]
        public async Task<ActionResult<List<WordStatsDTO>>> PutStats(WordStatsActionModel vm)
        {
            _logger.LogInformation("Increase word stats");
            var query = new GetWordStatsQuery()
            {
                UserId = User.GetUserId(),
                WordId = vm.WordId,
            };
            var wordStats = await _dispatcher.DispatchAsync(query) ?? new WordStats() { UserId = query.UserId, WordId = query.WordId };
            if (vm.OK)
            {
                wordStats.Correct++;
            }
            else
            {
                wordStats.Wrong++;
            }

            wordStats.UpdatedDateTime = DateTime.Now;
            await _dispatcher.DispatchAsync(new AddOrUpdateEntityCommand<WordStats>(wordStats));
            return Ok(wordStats);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<WordModel>> Get(Guid id)
        {
            var word = await _dispatcher.DispatchAsync(new GetWordQuery { Id = id, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<WordModel>(word);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Word>> Post([FromBody] WordModel model)
        {
            var word = _mapper.Map<Word>(model);
            await _dispatcher.DispatchAsync(new AddUpdateWordCommand { Word = word });
            model = _mapper.Map<WordModel>(word);
            return Created($"/api/words/{model.Id}", model);
        }

        [HttpPut("{id}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Put(Guid id, [FromBody] WordModel model)
        {
            var word = await _dispatcher.DispatchAsync(new GetWordQuery { Id = id, ThrowNotFoundIfNull = true });

            word.Text = model.Text;

            await _dispatcher.DispatchAsync(new AddUpdateWordCommand { Word = word });

            model = _mapper.Map<WordModel>(word);

            return Ok(model);
        }

        [HttpPut]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Put([FromBody] Dictionary<CUDActionType, List<Word>> model)
        {
            await _dispatcher.DispatchAsync(new CUDEntititesCommand<Word>(model));
            return Ok();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(Guid id)
        {
            var word = await _dispatcher.DispatchAsync(new GetWordQuery { Id = id, ThrowNotFoundIfNull = true });

            await _dispatcher.DispatchAsync(new DeleteWordCommand { Word = word });

            return Ok();
        }
    }
}