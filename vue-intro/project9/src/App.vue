<template>
  <div id="app">
    <div
      v-bind:style="{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid var(--border)',
      }"
    >
      <Header />
      <Navigation />
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import "./global.css";
import { Component, Vue } from "vue-property-decorator";

import { Header, Navigation } from "./components/";

@Component({
  components: {
    Header,
    Navigation,
  },
})
export default class App extends Vue {
  created() {
    console.log(this.$store.state.count);
  }
  mounted() {
    this.$store.commit("increment");
    console.log(this.$store.state.count);
  }
}
</script>
