using ClassifiedAds.Application.StockGroupItems.Services;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockGroupItems.Commands
{
    public class AddStockGroupItemStocksCommand : ICommand
    {
        public Guid GroupId { get; set; }
        public List<string> StockCodes { get; set; }
    }

    internal class AddStockGroupItemStocksCommandHandler : ICommandHandler<AddStockGroupItemStocksCommand>
    {
        private readonly IStockGroupItemService _stockgroupitemService;

        public AddStockGroupItemStocksCommandHandler(IStockGroupItemService stockgroupitemService)
        {
            _stockgroupitemService = stockgroupitemService;
        }

        public async Task HandleAsync(AddStockGroupItemStocksCommand command, CancellationToken cancellationToken = default)
        {
            await _stockgroupitemService.AddAsync(command.GroupId, command.StockCodes);
        }
    }
}
