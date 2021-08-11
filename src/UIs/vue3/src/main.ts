import { createApp } from 'vue'
import router from './router'
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

authService.loadUser().then(user => {
    store.dispatch("tryAutoLogin", authService);
    if (authService.isAuthenticated()) {

    }
    const app = createApp(App)

    app.use(router)
    app.use(store)
    app.use(PrimeVue);

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

    app.mount('#app');
});