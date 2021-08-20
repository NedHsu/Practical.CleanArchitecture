import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import OidcLoginRedirect from "../auth/OidcLoginRedirect.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            index: 1  // 添加 meta 属性，约定 1 为第一级
        },
    },
    {
        path: "/products",
        name: "Products",
        component: () => import("../views/Products.vue"),
        meta: {
          index: 1
        }
    },
    //--routes
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
