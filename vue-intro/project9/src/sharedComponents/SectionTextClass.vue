<template>
  <p v-bind:class="styling" v-bind:style="{ color }">
    <slot></slot>
    <button v-on:click="toggleColor">Toggle Color</button>
  </p>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class SectionTextClass extends Vue {
  @Prop({ default: "plain" }) styling!: "plain" | "quote" | "tagline";
  @Prop({ default: "white" }) color!: "white" | "green";

  toggleColor() {
    this.color === "white" ? (this.color = "green") : (this.color = "white");
  }
}
</script>

<style scoped>
.plain {
  font-size: 1em;
}

.quote {
  font-size: 0.9em;
  border-left: 2px solid gray;
  padding-left: 10px;
}

.tagline {
  font-style: italic;
}
</style>
