<template>
  <p v-bind:class="styling" v-bind:style="{ color }">
    <slot></slot>
    <button v-on:click="toggleColor">Toggle Color</button>
  </p>
</template>
<script lang="ts">
type Data = {
  color: "white" | "red";
};

export default {
  name: "SectionText",
  props: {
    styling: {
      type: String,
      validator: (value: string) => {
        const isValid = ["plain", "quote", "tagline"].includes(value);
        return isValid;
      },
    },
  },
  data: function (): Data {
    return {
      color: "white",
    };
  },
  mounted: function () {
    console.log(`${this.$options.name} has mounted`);
  },
  methods: {
    toggleColor() {
      this.color === "white" ? (this.color = "red") : (this.color = "white");
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
