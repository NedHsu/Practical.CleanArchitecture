using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application
{
    public class CrudService<T> : ICrudService<T>
        where T : AggregateRoot<Guid>
    {
        private readonly IUnitOfWork _unitOfWork;
        protected readonly IRepository<T, Guid> _repository;
        private readonly IDomainEvents _domainEvents;

        public CrudService(IRepository<T, Guid> repository, IDomainEvents domainEvents)
        {
            _unitOfWork = repository.UnitOfWork;
            _repository = repository;
            _domainEvents = domainEvents;
        }

        public async Task<List<T>> GetAsync()
        {
            return await _repository.ToListAsync(_repository.GetAll());
        }

        public Task<T> GetByIdAsync(Guid Id)
        {
            ValidationException.Requires(Id != Guid.Empty, "Invalid Id");
            return _repository.FirstOrDefaultAsync(_repository.GetAll().Where(x => x.Id == Id));
        }

        public async Task AddOrUpdateAsync(T entity)
        {
            var adding = entity.Id.Equals(default);

            await _repository.AddOrUpdateAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            if (adding)
            {
                await _domainEvents.DispatchAsync(new EntityCreatedEvent<T>(entity, DateTime.UtcNow));
            }
            else
            {
                await _domainEvents.DispatchAsync(new EntityUpdatedEvent<T>(entity, DateTime.UtcNow));
            }
        }

        public async Task DeleteAsync(T entity)
        {
            _repository.Delete(entity);
            await _unitOfWork.SaveChangesAsync();
            await _domainEvents.DispatchAsync(new EntityDeletedEvent<T>(entity, DateTime.UtcNow));
        }

        public async Task DeleteAsync(List<T> entites)
        {
            _repository.BulkDelete(entites);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task CUDAsync<T2>(List<T2> entities)
            where T2 : T, ICommandAction
        {
            _repository.BulkDelete(entities.Where(x => x.Action.Equals(CUDActionType.Delete)));
            _repository.BulkUpdate(entities.Where(x => x.Action.Equals(CUDActionType.Update)), x => new { x.Id });
            _repository.BulkInsert(entities.Where(x => x.Action.Equals(CUDActionType.Create)));
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
