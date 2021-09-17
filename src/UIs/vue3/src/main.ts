import { createApp } from 'vue'
import { setupI18n } from './i18n'
import { setupRouter } from './router'
import store from './store'
import App from './App.vue'
import authService from './auth/authService'
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Rating from 'primevue/Rating';
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Menu from 'primevue/menu';
import Toast from 'primevue/toast';
import SelectButton from 'primevue/selectbutton';
import ToastService from 'primevue/toastservice';
import InputText from 'primevue/inputtext';
import ColorPicker from 'primevue/colorpicker';
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import Divider from 'primevue/divider';
import Sidebar from 'primevue/sidebar';
import TabMenu from 'primevue/tabmenu';

import en from './locales/en.yaml';
import 'primeflex/primeflex.css';

authService.loadUser().then(user => {
    store.dispatch("TRY_AUTO_LOGIN", authService);
    if (authService.isAuthenticated()) {
        store.dispatch("LOGIN", user);
        store.dispatch("notification/CONNECT_NOTIFICATION_HUB");
    }

    const i18nInstance = setupI18n({
        legacy: false,
        locale: 'en',
        fallbackLocale: 'en',
        messages: {
            en
        }
    });
    const router = setupRouter(i18nInstance);
    const app = createApp(App);

    app.use(store);
    app.use(PrimeVue);
    app.use(i18nInstance);
    app.use(router);
    app.use(ToastService);

    app.component('Dialog', Dialog);
    app.component('Toolbar', Toolbar);
    app.component('Button', Button);
    app.component('DataTable', DataTable);
    app.component('Column', Column);
    app.component('ColumnGroup', ColumnGroup);
    app.component('Rating', Rating);
    app.component('Menubar', Menubar);
    app.component('Avatar', Avatar);
    app.component('AvatarGroup', AvatarGroup);
    app.component('Menu', Menu);
    app.component('Toast', Toast);
    app.component('SelectButton', SelectButton);
    app.component('InputText', InputText);
    app.component('ColorPicker', ColorPicker);
    app.component('Card', Card);
    app.component('Dropdown', Dropdown);
    app.component('Divider', Divider);
    app.component('Sidebar', Sidebar);
    app.component('TabMenu', TabMenu);
    
    app.mount('#app');
});