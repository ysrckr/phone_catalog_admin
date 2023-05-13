import { createApp } from 'vue';
import App from './App.vue';
// Router
import { router } from './router';
// Vue Query
import { VueQueryPlugin } from '@tanstack/vue-query';
// Pinia
import { createPinia } from 'pinia';
// Toastify
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
// Styles
import './style.css';
// Vuetify
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

const pinia = createPinia();

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(VueQueryPlugin)
  .use(vuetify)
  .use(Vue3Toastify, {
    position: 'top-right',
    timeout: 2000,
    closeIcon: true,
    pauseOnHover: true,
  } as ToastContainerOptions);
app.mount('#app');
