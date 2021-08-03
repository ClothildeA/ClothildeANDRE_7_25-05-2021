import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome,
  faUserCircle,
  faSignOutAlt,
  faPaperPlane,
  faNewspaper,
  faUser,
  faHistory,
  faTrashAlt,
  faComment
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faHome,
  faUserCircle,
  faSignOutAlt,
  faPaperPlane,
  faNewspaper,
  faUser,
  faHistory,
  faTrashAlt,
  faComment
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
