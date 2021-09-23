<template>
    <Menubar :model="items">
        <template #start>
            <img
                alt="logo"
                src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                height="40"
                class="p-mr-2"
            />
        </template>
        <template #end>
            <div class="p-grid p-ai-center vertical-container user-container">
                <div class="p-col user-profile" v-if="isAuthenticated">
                    <Avatar
                        image="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                        size="large"
                        shape="circle"
                        @click="toggleMenu"
                    />
                    <span>{{ user.profile.name }}</span>
                    <Menu ref="menu" :model="userMenu" :popup="true" />
                </div>
                <div v-else>
                    <Button type="button" @click="login">Login</Button>
                </div>
                <div class="p-col language-container">
                    <form class="language">
                        <select id="locale-select" v-model="currentLocale">
                            <option
                                v-for="optionLocale in supportLocales"
                                :key="optionLocale"
                                :value="optionLocale"
                            >
                                {{ optionLocale }}
                            </option>
                        </select>
                    </form>
                </div>
            </div>
        </template>
    </Menubar>
    <Toast position="bottom-center" group="bc">
        <template #message="slotProps">
            <div class="p-d-flex p-flex-column">
                <div class="p-text-center">
                    <i
                        class="pi pi-exclamation-triangle"
                        style="font-size: 3rem"
                    ></i>
                    <h4>{{ slotProps.message.summary }}</h4>
                    <p>{{ slotProps.message.detail }}</p>
                </div>
                <div class="p-grid p-fluid">
                    <div class="p-col-6">
                        <Button class="p-button-success" label="Yes"></Button>
                    </div>
                    <div class="p-col-6">
                        <Button class="p-button-secondary" label="No"></Button>
                    </div>
                </div>
            </div>
        </template>
    </Toast>
</template>
<script lang="ts">
import { defineComponent, ref, version, watch, inject, onMounted } from "vue";
import store from "../store";
import { PrimeIcons } from "primevue/api";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { SUPPORT_LOCALES } from "../i18n";
import { useToast } from "primevue/usetoast";

export default defineComponent({
    setup() {
        const router = useRouter();
        const { t, locale } = useI18n({ useScope: "global" });
        const menu = ref();
        const toast = useToast();

        onMounted(() => {});

        /**
         * select locale value for language select form
         *
         * If you use the vue-i18n composer `locale` property directly, it will be re-rendering component when this property is changed,
         * before dynamic import was used to asynchronously load and apply locale messages
         * To avoid this, use the another locale reactive value.
         */
        const currentLocale = ref(locale.value);
        // sync to switch locale from router locale path
        watch(router.currentRoute, (route) => {
            currentLocale.value = route.params.locale as string;
        });
        /**
         * when change the locale, go to locale route
         *
         * when the changes are detected, load the locale message and set the language via vue-router navigation guard.
         * change the vue-i18n locale too.
         */
        let reload = inject<any>("reload");
        watch(currentLocale, async (val, oldVal) => {
            if (val != oldVal) {
                await router.push({
                    name: router.currentRoute.value.name!,
                    params: { locale: val },
                });
                reload();
            }
        });
        return {
            menu,
            t,
            router,
            locale,
            currentLocale,
            supportLocales: SUPPORT_LOCALES,
            toast,
        };
    },
    computed: {
        isAuthenticated() {
            return store.state.authService.authService.isAuthenticated();
        },
        user() {
            return store.state.authService.user;
        },
    },
    methods: {
        toggleMenu(event: Event) {
            this.menu.toggle(event);
            console.log(this.user);
            this.toast.add({
                severity: "warn",
                summary: "Info Message",
                detail: "Message Content",
                life: 3000,
                group: "bc",
            });
        },
        login() {
            store.state.authService.authService.login();
        },
    },
    data() {
        const router = useRouter();
        const { t, locale } = useI18n({ useScope: "global" });
        return {
            pageTitle: `ClassifiedAds.Vue ${version}`,
            userMenu: [
                {
                    label: "Quit",
                    icon: "pi pi-fw pi-power-off",
                    command: () => {
                        store.dispatch("LOGOUT");
                    },
                },
            ],
            items: [
                {
                    label: `ClassifiedAds.Vue ${version}`,
                    command: () => {
                        router.push({
                            name: "Home",
                        });
                    },
                },
                {
                    label: t("navigations.product"),
                    icon: PrimeIcons.LIST,
                    command: () => {
                        router.push({
                            name: "Products",
                        });
                    },
                },
                {
                    label: "Events",
                    icon: "pi pi-fw pi-calendar",
                    items: [
                        {
                            label: "Tui Calendar",
                            command: () => {
                                router.push({
                                    name: "CalendarEvents",
                                });
                            },
                        },
                        {
                            label: "Full Calendar",
                            command: () => {
                                router.push({
                                    name: "FullCalendars",
                                });
                            },
                        },
                    ],
                },
                {
                    label: "Awesomes",
                    icon: "pi pi-fw pi-book",
                    command: () => {
                        router.push({
                            name: "AwesomePages",
                        });
                    },
                },
                {
                    label: "File",
                    icon: "pi pi-fw pi-file",
                    items: [
                        {
                            label: "New",
                            icon: "pi pi-fw pi-plus",
                            items: [
                                {
                                    label: "Bookmark",
                                    icon: "pi pi-fw pi-bookmark",
                                },
                                {
                                    label: "Video",
                                    icon: "pi pi-fw pi-video",
                                },
                            ],
                        },
                        {
                            label: "Delete",
                            icon: "pi pi-fw pi-trash",
                        },
                        {
                            separator: true,
                        },
                        {
                            label: "Export",
                            icon: "pi pi-fw pi-external-link",
                            command: () => {
                                router.push({
                                    name: "porducts",
                                });
                            },
                        },
                    ],
                },
                {
                    label: "Edit",
                    icon: "pi pi-fw pi-pencil",
                    items: [
                        {
                            label: "Left",
                            icon: "pi pi-fw pi-align-left",
                        },
                        {
                            label: "Right",
                            icon: "pi pi-fw pi-align-right",
                        },
                        {
                            label: "Center",
                            icon: "pi pi-fw pi-align-center",
                        },
                        {
                            label: "Justify",
                            icon: "pi pi-fw pi-align-justify",
                        },
                    ],
                },
                {
                    label: "Users",
                    icon: "pi pi-fw pi-user",
                    items: [
                        {
                            label: "New",
                            icon: "pi pi-fw pi-user-plus",
                        },
                        {
                            label: "Delete",
                            icon: "pi pi-fw pi-user-minus",
                        },
                        {
                            label: "Search",
                            icon: "pi pi-fw pi-users",
                            items: [
                                {
                                    label: "Filter",
                                    icon: "pi pi-fw pi-filter",
                                    items: [
                                        {
                                            label: "Print",
                                            icon: "pi pi-fw pi-print",
                                        },
                                    ],
                                },
                                {
                                    icon: "pi pi-fw pi-bars",
                                    label: "List",
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    },
});
</script>
<style lang="scss" scoped>
.user-profile {
    display: flex;
    div {
        margin: auto;
    }
    .p-avatar {
        cursor: pointer;
    }
    span {
        margin: auto;
        padding: 0 5px;
        cursor: pointer;
    }
}

@media screen and (max-width: 960px) {
    .user-container {
        margin: 0px;
    }
    .language-container {
        width: 3rem;
    }
}
</style>