using ClassifiedAds.Domain.Entities;
using MicroOrm.Dapper.Repositories.Attributes.Joins;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassifiedAds.Persistence.DapperModels
{
    [Table("Stock")]
    public class StockDTO : Stock
    {
        public StockDTO() : base()
        {
        }

        [LeftJoin("stockDay", "Code", "StockCode", TableAlias = "StockDay_Id")]
        public virtual ICollection<StockDay> StockDays { get; set; }

    }
}
