using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ClassifiedAds.Blazor.Modules.Core.Components;
using ClassifiedAds.Blazor.Modules.Matchs.Components;
using ClassifiedAds.Blazor.Modules.Matchs.Models;
using ClassifiedAds.Blazor.Modules.Matchs.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.Extensions.Logging;

namespace ClassifiedAds.Blazor.Modules.Matchs.Pages {
    public partial class List {
        [CascadingParameter]
        Task<AuthenticationState> AuthenticationStateTask { get; set; }

        [Inject]
        public MatchService MatchService { get; set; }

        [Inject]
        public NavigationManager NavManager { get; set; }

        [Inject]
        public ILogger<List> Logger { get; set; }

        protected JoinDialog JoinDialog { get; set; }

        public List<MatchModel> Matchs { get; set; }

        public MatchModel DeletingMatch { get; private set; }

        public bool IsMe { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        protected override async Task OnInitializedAsync() {
            Matchs = new List<MatchModel> {
                new MatchModel {
                Title = "一起打籃球",
                Description = "3V3 自行報隊",
                CreateTime = System.DateTime.Now,
                StartTime = System.DateTime.Now,
                CreaterName = "Ned",
                Joined = 1,
                Location = new LocationModel {
                Name = "天橋下",
                Latitude = 24.227144866802035,
                Longitude = 120.62602541304933,
                }
                },
                new MatchModel {
                Title = "夜衝",
                Description = "台北到台中",
                StartTime = System.DateTime.Now,
                CreateTime = System.DateTime.Now,
                CreaterName = "Ned",
                Joined = 2,
                Location = new LocationModel {
                Latitude = 24.227144866802035,
                Longitude = 120.72602541304933,
                Name = "台北車站"
                }
                },
                new MatchModel {
                Title = "單車",
                Description = "日月潭環潭",
                StartTime = System.DateTime.Now,
                CreateTime = System.DateTime.Now,
                CreaterName = "Ned",
                Joined = 3,
                Location = new LocationModel {
                Latitude = 24.127144866802035,
                Longitude = 120.62602541304933,
                Name = "日月潭"
                }
                }
            };
            //await MatchService.GetMatchs();
        }

        protected async Task Join(MatchModel match) {
            JoinDialog.Show(match);
        }

        protected async Task Add() {
            NavManager.NavigateTo("/matchs/add");
        }

        protected async Task Search() {
        }
    }
}