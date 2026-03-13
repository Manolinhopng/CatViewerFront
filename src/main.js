import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';
const app = createApp(App);
app.use(router);
app.config.globalProperties.$cloudinary = {
    cloudName: 'tu-cloud-name',
    uploadPreset: 'tu-upload-preset'
};
app.mount('#app');
