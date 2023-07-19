import '@/styles/base.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowLeftLong,
  faBars,
  faBookmark,
  faEllipsisVertical,
  faLocationArrow,
  faSearch,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

const app = createApp(App)

library.add(
  faBars,
  faArrowLeftLong,
  faSearch,
  faLocationArrow,
  faSpinner,
  faBookmark,
  faEllipsisVertical
)

app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
