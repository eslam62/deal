import { createApp } from 'vue'
import Notifications from '@kyvg/vue3-notification'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './registerServiceWorker'
import './tailwind.css'
import '../src/assets/css/style.css'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import  VueGoogleMaps from '@fawmi/vue-google-maps'
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'

createApp(App).use(store)
.use(router)
.use(VueAxios, axios)
.use(Notifications)
.use(VueSweetalert2)
.use(VueTelInput)
.use(VueGoogleMaps, {
  load: {
    // key: "AIzaSyCpC_EvzUOBP8LxwaEU75dtoP8_hIIfPlM",
    key: localStorage.getItem('mapApiKey'),
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
  installComponents: true,
})
.mount('#app')


axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
  
        originalRequest._retry = true;
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        // store.dispatch('Logout')
        return router.push('/login')
    }
  }
})