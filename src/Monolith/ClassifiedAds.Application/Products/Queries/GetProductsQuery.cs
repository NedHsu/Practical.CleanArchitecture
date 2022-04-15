﻿using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.Products.Queries
{
    public class GetProductsQuery : IQuery<List<Product>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetProductsQueryHandler : IQueryHandler<GetProductsQuery, List<Product>>
    {
        private readonly IRepository<Product, Guid> _productRepository;

        public GetProductsQueryHandler(IRepository<Product, Guid> productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<List<Product>> HandleAsync(GetProductsQuery query, CancellationToken cancellationToken = default)
        {
            return (await _productRepository.GetAllAsync()).ToList();
        }
    }
}
