using System;

namespace ClassifiedAds.Application.Players.DTOs
{
    public class PlayerDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
