<template>
  <div>
    <SectionTitle :level="2">Vuex Page</SectionTitle>
    <SectionTextClass>This text is coming soon.</SectionTextClass>
    <SectionTextClass>Counter {{ count }}</SectionTextClass>
    <button v-on:click="increment">Increment</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import SectionTitle from "../sharedComponents/SectionTitle.vue";
import SectionTextClass from "../sharedComponents/SectionTextClass.vue";

@Component({
  components: {
    SectionTitle,
    SectionTextClass,
  },
  methods: {
    increment() {
      this.$store.commit("increment");
    },
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
})
export default class Header extends Vue {}
</script>