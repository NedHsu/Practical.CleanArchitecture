using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace ClassifiedAds.IdentityServer.Manage.Models
{
    public class ConfigureTwoFactorViewModel
    {
        public string SelectedProvider { get; set; }

        public ICollection<SelectListItem> Providers { get; set; }
    }
}
