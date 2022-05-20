using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application
{
    public class CUDEntititesCommand<TActionDTO, TEntity> : ICommand
        where TActionDTO : TEntity, ICommandAction
        where TEntity : AggregateRoot<Guid>
    {
        public CUDEntititesCommand(List<TActionDTO> entities)
        {
            Entities = entities;
        }

        public List<TActionDTO> Entities { get; set; }
    }

    internal class CUDEntititesCommandHandler<T2, TEntity> : ICommandHandler<CUDEntititesCommand<T2, TEntity>>
    where T2 : TEntity, ICommandAction
    where TEntity : AggregateRoot<Guid>
    {
        private readonly ICrudService<TEntity> _crudService;

        public CUDEntititesCommandHandler(ICrudService<TEntity> crudService)
        {
            _crudService = crudService;
        }

        public async Task HandleAsync(CUDEntititesCommand<T2, TEntity> command, CancellationToken cancellationToken = default)
        {
            await _crudService.CUDAsync(command.Entities);
        }
    }
}
