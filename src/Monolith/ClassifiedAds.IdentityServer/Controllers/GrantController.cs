﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ClassifiedAds.IdentityServer.Controllers
{
    [Authorize(Roles = "Admin")]
    public class GrantController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}