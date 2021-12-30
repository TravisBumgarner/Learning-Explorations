<template>
  <div>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/vuex">Vuex</router-link></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<style scoped>
ul {
  padding: 0;
}

li {
  display: inline-block;
  margin: 10px;
}
</style>
