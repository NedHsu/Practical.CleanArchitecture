const environment = {
    name: "development",
    OpenIdConnect: {
        Authority: "https://localhost:44367",
        ClientId: "ClassifiedAds.Vue"
    },
    ResourceServer: {
        Endpoint: "https://localhost:44312/api/",
        ChatHub: "https://localhost:44312/chatHub/",
        NotificationHub: "https://localhost:44312/notificationHub/",
    },
    CurrentUrl: "http://localhost:8080/"
};
export default environment;