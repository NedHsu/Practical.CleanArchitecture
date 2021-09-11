import { createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import OidcLoginRedirect from "../auth/OidcLoginRedirect.vue";

import { setI18nLanguage, loadLocaleMessages, SUPPORT_LOCALES } from '../i18n'
import type { I18n, Composer } from 'vue-i18n'

export function setupRouter(i18n: I18n): Router {
    const locale: string =
        i18n.mode === 'legacy'
            ? i18n.global.locale
            : ((i18n.global as unknown) as Composer).locale.value

    // setup routes
    const routes: RouteRecordRaw[] = [
        {
            path: "/oidc-login-redirect",
            name: "OidcLoginRedirect",
            component: OidcLoginRedirect,
        },
        {
            path: "/:locale/",
            name: "Home",
            component: Home,
            meta: {
                index: 1  // 添加 meta 属性，约定 1 为第一级
            },
        },
        {
            path: "/:locale/products",
            name: "Products",
            component: () => import("../views/Products.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: () => `/${locale}`
        },
        //--routes
        {
            path: "/:locale/calendars/Add",
            name: "CalendarAdd",
            component: () => import("../views/CalendarMotify.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/calendars/edit/:id",
            name: "CalendarEdit",
            component: () => import("../views/CalendarMotify.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/calendars",
            name: "Calendars",
            component: () => import("../views/Calendars.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/notifications",
            name: "Notifications",
            component: () => import("../views/Notifications.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/calendarEvents",
            name: "CalendarEvents",
            component: () => import("../views/CalendarEvents.vue"),
            meta: {
                index: 1
            }
        },
    ]

    // create router instance
    const router = createRouter({
        history: createWebHistory(),
        routes
    })

    // navigation guards
    router.beforeEach(async to => {
        if (to.path.includes('oidc-login-redirect')) {
            return
        }

        const paramsLocale = to.params.locale as string
        console.log(paramsLocale);

        // use locale if paramsLocale is not in SUPPORT_LOCALES
        if (!SUPPORT_LOCALES.includes(paramsLocale)) {
            return `/${locale}`
        }

        // load locale messages
        if (!i18n.global.availableLocales.includes(paramsLocale)) {
            await loadLocaleMessages(i18n, paramsLocale)
        }

        // set i18n language
        setI18nLanguage(i18n, paramsLocale)
    })

    return router
}