import Vue from 'vue'
import '@/styles/index.scss' // global css
import ElementUI from 'element-ui';
import '@/permission' // permission control
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n';
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'
import store from './store'
import moment from 'moment'

Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.use(VueCookies);

// this.$cookies.config('30d')

const language = navigator.language || navigator.userLanguage;
const lang = VueCookies.get('CultureInfo') || language;

const i18n = new VueI18n({
  locale: 'en', //lang !== 'zh-CN' ? 'en' : 'zh-CN', // 将要切换的语言
  messages: {
    'zh-CN': require('./assets/languages/zh.json'), // 本地资源文件，中文&英文
    'en': require('./assets/languages/en.json')
  }
});

Vue.config.productionTip = false;

Vue.filter('timeFormat', function(timestamp) {
  return moment.parseZone(timestamp).local().format('YYYY-MM-DD HH:mm:ss')
})

Vue.filter('timeFormatUTC', function(timestamp) {
  return moment(timestamp).utc().format('YYYY-MM-DD HH:mm:ss ') + ' UTC'
})
window.document.title = 'SHchain ' + process.env.NETWORKTITLE + ' Explorer'

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
