const environment = {
    name: "production",
    OpenIdConnect: {
        Authority: "https://minsdream-tst-identity.azurewebsites.net",
        ClientId: "ClassifiedAds.React"
    },
    ResourceServer: {
        Endpoint: "https://minsdream-tst-api.azurewebsites.net/api/",
        ChatHub: "https://minsdream-tst-api.azurewebsites.net/chatHub/",
        NotificationHub: "https://minsdream-tst-api.azurewebsites.net/notificationHub/",
        NotificationEndpoint: "https://minsdream-tst-api.azurewebsites.net/hubs/notification",
    },
    CurrentUrl: "https://minsdream-tst-react.azurewebsites.net/"
};
export default environment;
