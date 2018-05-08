<template>
  <v-toolbar>
    <v-icon v-if="isConnected" large color='green'>done</v-icon>
    <v-icon v-else large color='red'>clear</v-icon>
    <v-spacer></v-spacer>
    <v-text-field hide-details single-line :value="doxieIP"></v-text-field>
    <v-btn flat @click='requestStatus'>
      Connect
    </v-btn>
    <v-btn flat @click='requestAllScans'>
      Refresh
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['doxieIP', 'isConnected'])
  },
  methods: {
    ...mapActions(['requestStatus', 'requestAllScans'])
  }
}
</script>
