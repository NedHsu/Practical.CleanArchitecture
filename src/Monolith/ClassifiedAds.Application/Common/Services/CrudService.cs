using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
            CrossCuttingConcerns.Exceptions.ValidationException.Requires(Id != Guid.Empty, "Invalid Id");
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

        public async Task CUDAsync(Dictionary<CUDActionType, List<T>> entityActions)
        {

            _repository.BulkDelete(entityActions[CUDActionType.Delete]);
            _repository.BulkUpdate(entityActions[CUDActionType.Update], typeof(T)
                .GetProperties().Where(x => !x.IsDefined(typeof(KeyAttribute), true) && !x.IsDefined(typeof(TimestampAttribute), true)).Select(x => x.Name).ToList());
            _repository.BulkInsert(entityActions[CUDActionType.Create]);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
