import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'

import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css';

// import api login google
import vue3GoogleLogin from 'vue3-google-login'

//import css tailwind
import "./assets/style.css"

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.component("v-select", vSelect);

app.use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID
})

app.mount('#app')