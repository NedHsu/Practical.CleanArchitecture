﻿using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application
{
    public class StockCrudService<T> : IDapperCrudService<T>
        where T : class
    {
        private readonly IUnitOfWork _unitOfWork;
        protected readonly IStockRepository<T> _repository;
        private readonly IDomainEvents _domainEvents;

        public StockCrudService(IStockRepository<T> repository, IDomainEvents domainEvents)
        {
            _repository = repository;
            _domainEvents = domainEvents;
        }

        public virtual void AddOrUpdate(T entity)
        {
            var adding = _repository.AddOrUpdate(entity);
            _unitOfWork.SaveChanges();

            if (adding == 1)
            {
                _domainEvents.Dispatch(new EntityCreatedEvent<T>(entity, DateTime.UtcNow));
            }
            else
            {
                _domainEvents.Dispatch(new EntityUpdatedEvent<T>(entity, DateTime.UtcNow));
            }
        }

        public virtual IList<T> Get()
        {
            return _repository.GetAll().ToList();
        }

        public virtual void Delete(T entity)
        {
            _repository.Delete(entity);
            _unitOfWork.SaveChanges();
            _domainEvents.Dispatch(new EntityDeletedEvent<T>(entity, DateTime.UtcNow));
        }
    }
}
