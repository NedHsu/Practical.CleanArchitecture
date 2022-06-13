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
            component: () => import("../views/products/List.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/products/edit/:id",
            name: "ProductEdit",
            component: () => import("../views/products/Edit.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/products/add",
            name: "ProductAdd",
            component: () => import("../views/products/Edit.vue"),
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
            path: "/:locale/profiles",
            name: "Profiles",
            component: () => import("../views/profiles/View.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/profiles/edit/:id",
            name: "ProfileEdit",
            component: () => import("../views/profiles/Edit.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/profiles/add",
            name: "ProfileAdd",
            component: () => import("../views/profiles/Edit.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/payments",
            name: "Payments",
            component: () => import("../views/payments/List.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/payments/ecpay",
            name: "Payments",
            component: () => import("../views/payments/ECPay.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/payments/edit/:id",
            name: "PaymentEdit",
            component: () => import("../views/payments/Edit.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/payments/add",
            name: "PaymentAdd",
            component: () => import("../views/payments/Edit.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/words",
            name: "Words",
            component: () => import("../views/words/List.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/words/history",
            name: "WordHistory",
            component: () => import("../views/words/History.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/words/edit/:id",
            name: "WordEdit",
            component: () => import("../views/words/Edit.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/words/add",
            name: "WordAdd",
            component: () => import("../views/words/Edit.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/words/view",
            name: "WordView",
            component: () => import("../views/words/View.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/questions",
            name: "Questions",
            component: () => import("../views/Questions.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/stocks",
            name: "Stocks",
            component: () => import("../views/Stocks.vue"),
            meta: {
                index: 1
            }
        },
        {
            path: "/:locale/awesomePages",
            name: "AwesomePages",
            component: () => import("../views/AwesomePages.vue"),
            meta: {
                index: 1
            }
        },
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
        {
            path: "/:locale/fullCalendar",
            name: "FullCalendars",
            component: () => import("../views/FullCalendar.vue"),
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