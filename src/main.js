import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.config.productionTip = false

var firebase = require('firebase')

var config = {
  apiKey: 'AIzaSyBMD48X1R51IVtIciUL8DNF7v0xnELLQRk',
  authDomain: 'flouwer-195202.firebaseapp.com',
  databaseURL: 'https://flouwer-195202.firebaseio.com',
  projectId: 'flouwer-195202',
  storageBucket: 'flouwer-195202.appspot.com',
  messagingSenderId: '118631408341'
}
firebase.initializeApp(config)

Vue.prototype.$db = firebase.database()

Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
