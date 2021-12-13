<template>
  <div>
    <SectionTitle :level="2">Home Page</SectionTitle>
    <SectionText>This text is coming soon.</SectionText>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  import SectionTitle from '../sharedComponents/SectionTitle.vue'
  import SectionText from '../sharedComponents/SectionText.vue'
  import Component from 'vue-class-component'
  
  @Component({
    components: {
      SectionTitle, SectionText
    }
  })
  export default class Header extends Vue {}
</script>