<template>
  <div>
    <SectionTitle :level="2">Home Page</SectionTitle>
    <div
      v-bind:style="{
        display: 'flex',
        flexDirection: 'row',
      }"
    >
      <section>
        <SectionTextObject styling="quote">
          This text is an object.
        </SectionTextObject>
        <SectionTextObject styling="tagline">
          This text is an object.
        </SectionTextObject>
        <SectionTextObject styling="plain">
          This text is an object.
        </SectionTextObject>
      </section>
      <section>
        <SectionTextClass styling="quote">
          This text is an class.
        </SectionTextClass>
        <SectionTextClass styling="tagline">
          This text is an class.
        </SectionTextClass>
        <SectionTextClass styling="plain">
          This text is an class.
        </SectionTextClass>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import SectionTitle from "../sharedComponents/SectionTitle.vue";
import SectionTextClass from "../sharedComponents/SectionTextClass.vue";
import SectionTextObject from "../sharedComponents/SectionTextObject.vue";
import Component from "vue-class-component";

@Component({
  components: {
    SectionTitle,
    SectionTextClass,
    SectionTextObject,
  },
})
export default class Header extends Vue {}
</script>

<style scoped>
section {
  padding: 20px;
  margin: 20px;
}
</style>