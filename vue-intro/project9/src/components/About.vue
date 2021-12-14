<template>
  <div>
    <SectionTitle :level="2">About Page</SectionTitle>
    <SectionTextClass>This text is coming soon.</SectionTextClass>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import SectionTitle from '../sharedComponents/SectionTitle.vue'
  import SectionTextClass from '../sharedComponents/SectionTextClass.vue'
  
  @Component({
    components: {
      SectionTitle, SectionTextClass
    }
  })
  export default class Header extends Vue {}
</script>