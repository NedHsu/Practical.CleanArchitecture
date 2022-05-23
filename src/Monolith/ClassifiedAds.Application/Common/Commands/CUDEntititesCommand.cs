using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application
{
    public class CUDEntititesCommand<TEntity> : ICommand
        where TEntity : AggregateRoot<Guid>
    {
        public CUDEntititesCommand(Dictionary<CUDActionType, List<TEntity>> entityActions)
        {
            EntityActions = entityActions;
        }

        public Dictionary<CUDActionType, List<TEntity>> EntityActions { get; set; }
    }

    internal class CUDEntititesCommandHandler<TEntity> : ICommandHandler<CUDEntititesCommand<TEntity>>
    where TEntity : AggregateRoot<Guid>
    {
        private readonly ICrudService<TEntity> _crudService;

        public CUDEntititesCommandHandler(ICrudService<TEntity> crudService)
        {
            _crudService = crudService;
        }

        public async Task HandleAsync(CUDEntititesCommand<TEntity> command, CancellationToken cancellationToken = default)
        {
            await _crudService.CUDAsync(command.EntityActions);
        }
    }
}
