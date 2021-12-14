<template>
  <p v-bind:class="styling"><slot></slot></p>
</template>

<script lang="ts">
export default {
  name: "SectionText",
  props: {
    styling: {
      type: String,
      validator: (value) => ["plain", "quote", "tagline"].includes(value),
    },
  },
};
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
