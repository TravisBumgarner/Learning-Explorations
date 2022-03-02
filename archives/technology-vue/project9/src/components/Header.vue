<template>
  <SectionTitle :level="1">Travis Bumgarner Photography</SectionTitle>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SectionTitle from '../sharedComponents/SectionTitle.vue'

@Component({components: {SectionTitle}})
export default class Header extends Vue {}
</script>

<style scoped>
</style>
