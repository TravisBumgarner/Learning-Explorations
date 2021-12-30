import Vue from 'vue'
import VueRouter from "vue-router";
import Vuex from "vuex";

import App from './App.vue'
import { VuexPage, Home } from "./components/";

Vue.config.productionTip = false

Vue.use(VueRouter);
import store from "./store.vue";
Vue.use(Vuex);

const routes = [
  { path: "/", component: Home },
  { path: "/vuex", component: VuexPage },
];

const router = new VueRouter({
  routes,
});

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
