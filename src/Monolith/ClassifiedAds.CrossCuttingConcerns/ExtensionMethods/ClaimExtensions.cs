using System;
using System.Security.Claims;

namespace ClassifiedAds.CrossCuttingConcerns.ExtensionMethods
{
    public static class ClaimExtensions
    {
        public static Guid GetUserId(this ClaimsPrincipal user) 
        {
            Guid.TryParse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value, out Guid id);
            return id;
        }
    }
}