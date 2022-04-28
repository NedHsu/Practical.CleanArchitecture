namespace ClassifiedAds.Application.Questions.Commands
{
    public class AddUpdateQuestionCommand : ICommand
    {
        public Question Question { get; set; }
    }

    internal class AddUpdateQuestionCommandHandler : ICommandHandler<AddUpdateQuestionCommand>
    {
        private readonly IDapperCrudService<Question> _questionService;

        public AddUpdateQuestionCommandHandler(IDapperCrudService<Question> questionService)
        {
            _questionService = questionService;
        }

        public async Task HandleAsync(AddUpdateQuestionCommand command, CancellationToken cancellationToken = default)
        {
            await _questionService.AddOrUpdateAsync(command.Question);
        }
    }
}
