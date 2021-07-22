import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import OidcLoginRedirect from "../auth/OidcLoginRedirect.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/products",
        name: "Products",
        component: () => import("../views/Products.vue"),
    },
    {
        path: "/oidc-login-redirect",
        name: "OidcLoginRedirect",
        component: OidcLoginRedirect,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
