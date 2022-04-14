using ClassifiedAds.Application.StockGroupItems.Services;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockGroupItems.Commands
{
    public class UpdateStockGroupItemStocksCommand : ICommand
    {
        public Guid GroupId { get; set; }
        public List<string> StockCodes { get; set; }
    }

    internal class UpdateStockGroupItemStocksCommandHandler : ICommandHandler<UpdateStockGroupItemStocksCommand>
    {
        private readonly IStockGroupItemService _stockgroupitemService;

        public UpdateStockGroupItemStocksCommandHandler(IStockGroupItemService stockgroupitemService)
        {
            _stockgroupitemService = stockgroupitemService;
        }

        public async Task HandleAsync(UpdateStockGroupItemStocksCommand command, CancellationToken cancellationToken = default)
        {
            await _stockgroupitemService.UpdateAsync(command.GroupId, command.StockCodes);
        }
    }
}
