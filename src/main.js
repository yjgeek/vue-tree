import Vue from 'vue'
import App from './App.vue'
import Tree from './lib/index'
Vue.use(Tree)
new Vue({
  el: '#app',
  render: h => h(App)
})
