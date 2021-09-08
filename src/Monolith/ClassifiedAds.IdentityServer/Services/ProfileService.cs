using ClassifiedAds.Application;
using ClassifiedAds.Application.Users.Queries;
using ClassifiedAds.Domain.Entities;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ClassifiedAds.IdentityServer.Services
{
    public class ProfileService : IProfileService
    {
        private readonly Dispatcher _dispatcher;
        private readonly ILogger<ProfileService> _logger;
        private readonly UserManager<User> _userManager;
        private readonly IUserClaimsPrincipalFactory<User> _userClaimsPrincipalFactory;

        public ProfileService(Dispatcher dispatcher, ILogger<ProfileService> logger, UserManager<User> userManager, IUserClaimsPrincipalFactory<User> userClaimsPrincipalFactory)
        {
            _dispatcher = dispatcher;
            _logger = logger;
            _userManager = userManager;
            _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = _dispatcher.Dispatch(new GetUserQuery { Id = Guid.Parse(sub), IncludeClaims = true, IncludeRoles = true, IncludeUserRoles = true, AsNoTracking = true });
            List<Claim> claims = (await _userClaimsPrincipalFactory.CreateAsync(user)).Claims.ToList();
            claims.AddRange(user.Claims.Select(x => new Claim(x.Type, x.Value)).ToList());
            if (user.UserRoles?.Count > 0)
            {
                foreach (var role in user.UserRoles)
                {
                    claims.Add(new Claim("role", role.Role.Name));
                }
            }

            context.IssuedClaims = claims;
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _userManager.FindByIdAsync(sub);
            context.IsActive = user != null;
        }
    }
}
