
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.ts" lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    foo: String
  }
})
export default class MyFirstComponent extends Vue {
  foo: "5"
}
</script>