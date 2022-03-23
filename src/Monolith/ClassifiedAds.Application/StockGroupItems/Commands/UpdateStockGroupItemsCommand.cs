using ClassifiedAds.Application.StockGroupItems.Services;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockGroupItems.Commands
{
    public class UpdateStockGroupItemsCommand : ICommand
    {
        public string StockCode { get; set; }
        public List<Guid> StockGroupIds { get; set; }
    }

    internal class UpdateStockGroupItemsCommandHandler : ICommandHandler<UpdateStockGroupItemsCommand>
    {
        private readonly IStockGroupItemService _stockgroupitemService;

        public UpdateStockGroupItemsCommandHandler(IStockGroupItemService stockgroupitemService)
        {
            _stockgroupitemService = stockgroupitemService;
        }

        public void Handle(UpdateStockGroupItemsCommand command)
        {
            _stockgroupitemService.Update(command.StockCode, command.StockGroupIds);
        }
    }
}
