
<script lang="ts">
import Vue from 'vue'

export default Vue.component('section-title', {
  render: function (createElement) {
    return createElement(
      'h' + this.level, 
      this.$slots.default 
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
</script>

<style scoped>
h1 {
    font-size: 2.4em;
    font-weight: 700;
}

h2 {
    font-size: 2em;
    
}

h3 {
    font-size: 1.8em;
}

h4 {
    font-size: 1.6em;
}

h5 {
    font-size: 1.4em;
}

h6 {
    font-size: 1.2em;
}
</style>


