using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Persistence.DapperModels;
using MicroOrm.Dapper.Repositories;
using MicroOrm.Dapper.Repositories.DbContext;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassifiedAds.Persistence.DapperContext
{
    public class StockDbContext : DapperDbContext, IStockDbContext
    {
        private IDapperRepository<StockDTO> _stockRepository;

        protected StockDbContext(string connection) : base(new SqlConnection(connection))
        {
        }

        public IDapperRepository<StockDTO> Stock => _stockRepository ?? (_stockRepository = new DapperRepository<StockDTO>(Connection));

    }
}
