using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading.Tasks;

namespace ClassifiedAds.Blazor
{
    public class LoginModel : PageModel
    {
        public async Task OnGetAsync(string returnUrl)
        {
            if (!HttpContext.User.Identity.IsAuthenticated)
            {
                await HttpContext.ChallengeAsync(OpenIdConnectDefaults.AuthenticationScheme, new AuthenticationProperties
                {
                    RedirectUri = Url.IsLocalUrl(returnUrl) ? returnUrl : "/"
                });
            }
            else
            {
                Response.Redirect(Url.Content("~/").ToString());
            }
        }
    }
}