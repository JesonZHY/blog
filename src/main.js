import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.use(VueAxios, axios)
Vue.use(VueQuillEditor)
// 引入全局配置文件
import $conf from './common/config/config.js'
Vue.prototype.$conf = $conf

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
