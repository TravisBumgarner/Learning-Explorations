<template>
  <div id="app">
    <title>hi</title>
    <Header />
    <navigation />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import "./global.css";
import { Component, Vue } from "vue-property-decorator";
import VueRouter from "vue-router";

import { Header, Navigation, Home, About } from "./components/";

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const router = new VueRouter({
  routes
})

export { router}

@Component({
  components: {
    Header,
    Navigation,
  },
})
export default class App extends Vue {}
</script>
