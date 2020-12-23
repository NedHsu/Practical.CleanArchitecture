using ClassifiedAds.Blazor.Modules.Core.Components;
using ClassifiedAds.Blazor.Modules.Templates.Models;
using ClassifiedAds.Blazor.Modules.Templates.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClassifiedAds.Blazor.Modules.Templates.Pages
{
    public partial class List
    {
        [CascadingParameter]
        Task<AuthenticationState> AuthenticationStateTask { get; set; }

        [Inject]
        public TemplateService TemplateService { get; set; }

        [Inject]
        public NavigationManager NavManager { get; set; }

        [Inject]
        public ILogger<List> Logger { get; set; }

        protected ConfirmDialog DeleteDialog { get; set; }

        public List<TemplateModel> Templates { get; set; }

        public TemplateModel DeletingTemplate { get; private set; }

        protected override async Task OnInitializedAsync()
        {
            Templates = await TemplateService.GetTemplates();
        }

        protected async Task QuickAddTemplate()
        {
            NavManager.NavigateTo("/templates/add");
        }

    }
}
