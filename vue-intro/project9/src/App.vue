<template>
  <div id="app">
    <div v-bind:style="{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border)'}">
      <Header />
      <Navigation />
    </div>
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
  }
})
export default class App extends Vue {}
</script>
