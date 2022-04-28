namespace ClassifiedAds.Application.Questions.Commands
{
    public class DeleteQuestionCommand : ICommand
    {
        public Question Question { get; set; }
    }

    internal class DeleteQuestionCommandHandler : ICommandHandler<DeleteQuestionCommand>
    {
        private readonly IDapperCrudService<Question> _questionService;

        public DeleteQuestionCommandHandler(IDapperCrudService<Question> questionService)
        {
            _questionService = questionService;
        }

        public async Task HandleAsync(DeleteQuestionCommand command, CancellationToken cancellationToken = default)
        {
            await _questionService.DeleteAsync(command.Question);
        }
    }
}
