﻿using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockSeminars.Commands
{
    public class DeleteStockSeminarCommand : ICommand
    {
        public StockSeminar StockSeminar { get; set; }
    }

    internal class DeleteStockSeminarCommandHandler : ICommandHandler<DeleteStockSeminarCommand>
    {
        private readonly IDapperCrudService<StockSeminar> _stockseminarService;

        public DeleteStockSeminarCommandHandler(IDapperCrudService<StockSeminar> stockseminarService)
        {
            _stockseminarService = stockseminarService;
        }

        public void Handle(DeleteStockSeminarCommand command)
        {
            _stockseminarService.Delete(command.StockSeminar);
        }
    }
}