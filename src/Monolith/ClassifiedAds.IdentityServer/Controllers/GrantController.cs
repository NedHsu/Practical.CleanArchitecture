using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ClassifiedAds.IdentityServer.Controllers
{
    [Authorize]
    public class GrantController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}