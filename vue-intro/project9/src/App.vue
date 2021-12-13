<template>
  <div id="app">
    <Header />
    <navigation />
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
export default class App extends Vue {}
</script>
