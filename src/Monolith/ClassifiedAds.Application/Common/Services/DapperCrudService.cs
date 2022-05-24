using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application
{
    public class DapperCrudService<T> : IDapperCrudService<T>
        where T : class
    {
        private readonly IBaseDapperRepository<T> _repository;
        private readonly IDomainEvents _domainEvents;

        protected IBaseDapperRepository<T> Repository => _repository;

        public DapperCrudService(IBaseDapperRepository<T> repository, IDomainEvents domainEvents)
        {
            _repository = repository;
            _domainEvents = domainEvents;
        }
        public virtual async Task<IList<T>> Get()
        {
            return (await _repository.GetAllAsync()).ToList();
        }

        public virtual async Task DeleteAsync(T entity)
        {
            await _repository.DeleteAsync(entity);
            await _domainEvents.DispatchAsync(new EntityDeletedEvent<T>(entity, DateTime.UtcNow));
        }

        public async Task AddOrUpdateAsync(T entity)
        {
            var adding = await _repository.AddOrUpdateAsync(entity);

            if (adding == 1)
            {
                await _domainEvents.DispatchAsync(new EntityCreatedEvent<T>(entity, DateTime.UtcNow));
            }
            else
            {
                await _domainEvents.DispatchAsync(new EntityUpdatedEvent<T>(entity, DateTime.UtcNow));
            }
        }

        public async Task AddOrUpdateAsync(List<T> entities)
        {
            foreach (var entity in entities)
            {
                await AddOrUpdateAsync(entity);
            }
        }

        public async Task AddAsync(List<T> entities)
        {
            await _repository.AddAsync(entities);
        }

        public Task CUDAsync(List<T> entity)
        {
            throw new NotImplementedException();
        }

        public async Task AddAsync(T entity)
        {
            await _repository.AddAsync(entity);
        }

        public async Task UpdateAsync(T entity)
        {
            await _repository.UpdateAsync(entity);
        }

        public async Task UpdateAsync(List<T> entities)
        {
            await _repository.UpdateAsync(entities);
        }
    }
}
