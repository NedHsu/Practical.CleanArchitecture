using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Blazorise;
using ClassifiedAds.Blazor.Modules.Players.Models;
using Microsoft.AspNetCore.Components;

namespace ClassifiedAds.Blazor.Modules.Players.Components {
    public partial class PlayerSelector {
        // reference to the modal component
        private Modal modalRef;

        [Parameter]
        public EventCallback<List<PlayerModel>> ConfirmEventCallback { get; set; }

        public string Keyword { get; set; }

        private List<PlayerModel> selectedPlayers;

        private List<PlayerModel> playerOptions;

        public void Show(List<PlayerModel> players) {
            this.selectedPlayers = players;
            this.playerOptions = new List<PlayerModel>() {
                new PlayerModel {
                Name = "Test2"
                }
            };
            modalRef.Show();
        }

        public void AddPlayer(PlayerModel player) {
            selectedPlayers.Add(player);
        }

        public void RemovePlayer(PlayerModel player) {
            selectedPlayers.Remove(player);
        }

        public void Hide() {
            modalRef.Hide();
        }

        public async Task ConfirmAsync() {
            await ConfirmEventCallback.InvokeAsync(selectedPlayers);
            modalRef.Hide();
        }

        public async Task Search() {
            
        }
    }
}