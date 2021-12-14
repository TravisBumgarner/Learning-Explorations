<template>
    <p v-bind:class="type"><slot></slot></p>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class SectionTextClass extends Vue {
    @Prop({ default: 'plain' }) type!: "plain" | "quote" | "tagline"
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
