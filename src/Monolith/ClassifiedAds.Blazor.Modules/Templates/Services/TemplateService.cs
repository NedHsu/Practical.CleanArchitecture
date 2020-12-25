using ClassifiedAds.Blazor.Modules.Core.Services;
using ClassifiedAds.Blazor.Modules.Templates.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace ClassifiedAds.Blazor.Modules.Templates.Services
{
    public class TemplateService : HttpService
    {
        public TemplateService(HttpClient httpClient, ITokenManager tokenManager)
            : base(httpClient, tokenManager)
        {
        }

        public async Task<List<TemplateModel>> GetTemplates()
        {
            var templates = await GetAsync<List<TemplateModel>>("api/templates");
            return templates;
        }

        public async Task<TemplateModel> GetTemplateById(Guid id)
        {
            var template = await GetAsync<TemplateModel>($"api/templates/{id}");
            return template;
        }

        public async Task<TemplateModel> CreateTemplate(TemplateModel template)
        {
            var createdTemplate = await PostAsync<TemplateModel>("api/templates", template);
            return createdTemplate;
        }

        public async Task<TemplateModel> UpdateTemplate(Guid id, TemplateModel template)
        {
            var updatedTemplate = await PutAsync<TemplateModel>($"api/templates/{id}", template);
            return updatedTemplate;
        }

        public async Task DeleteTemplate(Guid id)
        {
            await DeleteAsync($"api/templates/{id}");
        }
    }
}
