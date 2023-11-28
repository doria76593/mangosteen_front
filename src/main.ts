import { routes } from './config/routes';
import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router'
import { history } from './shared/history';
import '@svgstore';
import 'vant/lib/index.css';//无语 vant的按需导入样式很有问题啊

const router = createRouter({ history, routes })

const app = createApp(App)
app.use(router)
app.mount('#app')
