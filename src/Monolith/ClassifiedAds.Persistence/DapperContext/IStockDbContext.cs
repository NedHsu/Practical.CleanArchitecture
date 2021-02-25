﻿using ClassifiedAds.Persistence.DapperModels;
using MicroOrm.Dapper.Repositories;
using MicroOrm.Dapper.Repositories.DbContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassifiedAds.Persistence.DapperContext
{
    public interface IStockDbContext : IDapperDbContext
    {
        IDapperRepository<StockDTO> Stock { get; }
    }
}
