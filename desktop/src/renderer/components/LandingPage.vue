<template>
  <div>{{status}}</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'landing-page',
  computed: {
    ...mapGetters(['status'])
  }
}
</script>
