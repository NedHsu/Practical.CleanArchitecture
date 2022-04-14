﻿using ClassifiedAds.Infrastructure.Web.Authorization.Policies;
using ClassifiedAds.Services.Identity.Authorization.Requirements;
using Microsoft.AspNetCore.Authorization;

namespace ClassifiedAds.Services.Identity.Authorization.Policies.Roles
{
    public class DeleteRolePolicy : IPolicy
    {
        public void Configure(AuthorizationPolicyBuilder policy)
        {
            policy.RequireAuthenticatedUser();
            policy.AddRequirements(new PermissionRequirement
            {
                Feature = "RolesManagement",
                Action = "Delete",
            });
        }
    }
}
