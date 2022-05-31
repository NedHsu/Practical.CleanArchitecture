using AutoMapper;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.WebAPI.Models.WordCustoms;
using ClassifiedAds.WebAPI.Models.Words;

namespace ClassifiedAds.WebAPI.AutoMapper
{
    public class WordProfile : Profile
    {
        public WordProfile()
        {
            CreateMap<WordCustom, WordCustomModel>();
            CreateMap<Word, WordModel>();
        }
    }
}
