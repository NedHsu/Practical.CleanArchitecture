using AutoMapper;
using ClassifiedAds.Application;
using ClassifiedAds.Application.Questions.Commands;
using ClassifiedAds.Application.Questions.DTOs;
using ClassifiedAds.Application.Questions.Queries;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.Questions;
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
    public class QuestionsController : ControllerBase
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public QuestionsController(Dispatcher dispatcher, ILogger<QuestionsController> logger, IMapper mapper)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<QuestionModel>> Get()
        {
            _logger.LogInformation("Getting all questions");
            var questions = _dispatcher.Dispatch(new GetQuestionsQuery() { });
            var model = _mapper.Map<IEnumerable<QuestionModel>>(questions);
            return Ok(model);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<QuestionModel> Get(Guid id)
        {
            var question = _dispatcher.Dispatch(new GetQuestionQuery { Id = id, ThrowNotFoundIfNull = true });
            var model = _mapper.Map<QuestionModel>(question);
            return Ok(model);
        }

        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<Question> Post([FromBody] QuestionModel model)
        {
            var question = _mapper.Map<Question>(model);
            _dispatcher.Dispatch(new AddUpdateQuestionCommand { Question = question });
            model = _mapper.Map<QuestionModel>(question);
            return Created($"/api/questions/{model.Id}", model);
        }

        [HttpPut("{id}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Put(Guid id, [FromBody] QuestionModel model)
        {
            var question = _dispatcher.Dispatch(new GetQuestionQuery { Id = id, ThrowNotFoundIfNull = false })
                ?? new Question { };

            question.Content = model.Content;

            _dispatcher.Dispatch(new AddUpdateQuestionCommand { Question = question });

            model = _mapper.Map<QuestionModel>(question);

            return Ok(model);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(Guid id)
        {
            var question = _dispatcher.Dispatch(new GetQuestionQuery { Id = id, ThrowNotFoundIfNull = true });

            _dispatcher.Dispatch(new DeleteQuestionCommand { Question = question });

            return Ok();
        }
    }
}