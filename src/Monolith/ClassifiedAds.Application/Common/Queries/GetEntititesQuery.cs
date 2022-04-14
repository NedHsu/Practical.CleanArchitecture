﻿using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ClassifiedAds.Application
{
    public class GetEntititesQuery<TEntity> : IQuery<List<TEntity>>
         where TEntity : AggregateRoot<Guid>
    {
    }

    internal class GetEntititesQueryHandler<TEntity> : IQueryHandler<GetEntititesQuery<TEntity>, List<TEntity>>
    where TEntity : AggregateRoot<Guid>
    {
        private readonly IRepository<TEntity, Guid> _repository;

        public GetEntititesQueryHandler(IRepository<TEntity, Guid> repository)
        {
            _repository = repository;
        }

        public async Task<List<TEntity>> HandleAsync(GetEntititesQuery<TEntity> query, CancellationToken cancellationToken = default)
        {
            return (await _repository.GetAllAsync()).ToList();
        }
    }
}
